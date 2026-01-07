// 📂 src/lib/getAmazonProduct.ts
import crypto from 'crypto';
import axios from 'axios';

const REGION = 'us-east-1';
const SERVICE = 'ProductAdvertisingAPI';
const HOST = 'webservices.amazon.ca';
const PATH = '/paapi5/getitems';
const ENDPOINT = `https://${HOST}${PATH}`;
const AMZ_TARGET = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';

const ASIN_RE = /^[A-Z0-9]{10}$/i;

function hmac(key: crypto.BinaryLike, msg: string | Buffer) {
  return crypto.createHmac('sha256', key).update(msg).digest();
}
function sha256Hex(payload: string | Buffer): string {
  return crypto.createHash('sha256').update(payload).digest('hex');
}
function getSignatureKey(secretKey: string, dateStamp: string, region: string, service: string) {
  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
}
function toAmzDate(d = new Date()): { amzDate: string; dateStamp: string } {
  const amzDate = d.toISOString().replace(/[:-]|\.\d{3}/g, '');
  return { amzDate, dateStamp: amzDate.slice(0, 8) };
}
function normalizeAsin(a: string): string {
  return a.trim().toUpperCase();
}

/* ---------- Type guards & accès sûrs ---------- */
function isRecord(u: unknown): u is Record<string, unknown> {
  return typeof u === 'object' && u !== null;
}

function get(obj: unknown, path: ReadonlyArray<string | number>): unknown {
  let cur: unknown = obj;

  for (const key of path) {
    // cas tableau
    if (typeof key === 'number') {
      if (Array.isArray(cur) && key >= 0 && key < cur.length) {
        cur = cur[key];
        continue;
      }
      return undefined;
    }

    // cas objet (clé string)
    if (isRecord(cur) && Object.prototype.hasOwnProperty.call(cur, key)) {
      cur = cur[key];
      continue;
    }

    return undefined;
  }

  return cur;
}

/** Type minimal consommable côté front (ajoute des champs si besoin) */
export type AmazonProduct = {
  asin: string;
  title?: string;
  image?: string;
  price?: string; // "$29.99"
  availability?: string; // "In Stock."
  raw?: unknown; // réponse brute pour debug
};

/** Map “safe” de la réponse PA-API v5 vers un objet minimal */
function pickProduct(u: unknown, fallbackAsin: string): AmazonProduct | null {
  // Chemin attendu : ItemsResult.Items[0]
  const first = get(u, ['ItemsResult', 'Items', 0]);
  if (!isRecord(first)) return null;

  const asinRaw = get(first, ['ASIN']);
  const asin = typeof asinRaw === 'string' ? asinRaw : fallbackAsin;

  const titleVal = get(first, ['ItemInfo', 'Title', 'DisplayValue']);
  const title = typeof titleVal === 'string' ? titleVal : undefined;

  const imgMed = get(first, ['Images', 'Primary', 'Medium', 'URL']);
  const imgLarge = get(first, ['Images', 'Primary', 'Large', 'URL']);
  const image =
    typeof imgLarge === 'string' ? imgLarge : typeof imgMed === 'string' ? imgMed : undefined;

  const listingsU: unknown = get(first, ['Offers', 'Listings']);

  let price: string | undefined;
  let availability: string | undefined;

  if (Array.isArray(listingsU) && listingsU.length > 0) {
    const l0: unknown = listingsU[0];
    if (isRecord(l0)) {
      const pU = get(l0, ['Price', 'DisplayAmount']);
      if (typeof pU === 'string') price = pU;

      const avU = get(l0, ['Availability', 'Message']);
      if (typeof avU === 'string') availability = avU;
    }
  }

  return { asin, title, image, price, availability, raw: u };
}

/**
 * Appelle Amazon PA-API v5 et renvoie un produit minimal typé.
 * Lance une Error en cas d’échec.
 */
export async function getAmazonProduct(asinInput: string): Promise<AmazonProduct> {
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const associateTag = process.env.AMAZON_ASSOCIATE_TAG;

  if (!accessKey || !secretKey || !associateTag) {
    throw new Error('Configuration Amazon manquante: AMAZON_ACCESS_KEY/SECRET_KEY/ASSOCIATE_TAG.');
  }

  const asin = normalizeAsin(asinInput);
  if (!ASIN_RE.test(asin)) {
    throw new Error('ASIN invalide (attendu: 10 caractères alphanumériques).');
  }

  const bodyObj = {
    ItemIds: [asin],
    Resources: [
      'Images.Primary.Medium',
      'Images.Primary.Large',
      'ItemInfo.Title',
      'Offers.Listings.Price',
      'Offers.Listings.Availability',
    ],
    PartnerTag: associateTag,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.ca',
  } as const;

  const body = JSON.stringify(bodyObj);
  const payloadHash = sha256Hex(body);
  const { amzDate, dateStamp } = toAmzDate();

  // headers canoniques triés
  const canonicalHeaders =
    'content-type:application/json; charset=UTF-8\n' +
    `host:${HOST}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:${AMZ_TARGET}\n`;
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date;x-amz-target';

  const canonicalRequest = ['POST', PATH, '', canonicalHeaders, signedHeaders, payloadHash].join(
    '\n',
  );

  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
  const stringToSign = [algorithm, amzDate, credentialScope, sha256Hex(canonicalRequest)].join(
    '\n',
  );

  const signingKey = getSignatureKey(secretKey, dateStamp, REGION, SERVICE);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  const authorizationHeader =
    `${algorithm} Credential=${accessKey}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Amz-Date': amzDate,
    'X-Amz-Target': AMZ_TARGET,
    'X-Amz-Content-Sha256': payloadHash,
    Authorization: authorizationHeader,
    Host: HOST,
  };

  const res = await axios.post<unknown>(ENDPOINT, body, {
    headers,
    timeout: 15_000,
    validateStatus: (s) => s >= 200 && s < 300,
  });

  const data: unknown = res.data;

  // Erreurs PA-API : { Errors: [{ Message: "..." }]}
  const errors = get(data, ['Errors']);
  if (Array.isArray(errors) && errors.length > 0) {
    const msgU = get(errors, [0, 'Message']);
    const msg = typeof msgU === 'string' ? msgU : 'Amazon PA-API error';
    throw new Error(`Amazon PA-API error: ${msg}`);
  }

  const mapped = pickProduct(data, asin);
  if (!mapped) {
    throw new Error('Réponse Amazon inattendue ou produit introuvable.');
  }
  return mapped;
}
