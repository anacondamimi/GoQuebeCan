// 📂 src/lib/getAmazonProduct.ts

import crypto from 'crypto';
import axios from 'axios';

const accessKey = process.env.AMAZON_ACCESS_KEY!;
const secretKey = process.env.AMAZON_SECRET_KEY!;
const associateTag = process.env.AMAZON_ASSOCIATE_TAG!;
const region = 'us-east-1';
const service = 'ProductAdvertisingAPI';

function sign(key: Buffer, message: string) {
  return crypto.createHmac('sha256', key).update(message).digest();
}

function getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string) {
  const kDate = sign(Buffer.from('AWS4' + key, 'utf-8'), dateStamp);
  const kRegion = sign(kDate, regionName);
  const kService = sign(kRegion, serviceName);
  const kSigning = sign(kService, 'aws4_request');
  return kSigning;
}

export async function getAmazonProduct(asin: string) {
  const host = 'webservices.amazon.ca';
  const endpoint = `https://${host}/paapi5/getitems`;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.substring(0, 8);

  const body = JSON.stringify({
    ItemIds: [asin],
    Resources: [
      'Images.Primary.Medium',
      'ItemInfo.Title',
      'Offers.Listings.Price',
      'Offers.Listings.Availability',
    ],
    PartnerTag: associateTag,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.ca',
  });

  const hashedPayload = crypto.createHash('sha256').update(body).digest('hex');

  const canonicalRequest = [
    'POST',
    '/paapi5/getitems',
    '',
    `host:${host}`,
    `x-amz-date:${amzDate}`,
    '',
    'host;x-amz-date',
    hashedPayload,
  ].join('\n');

  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    algorithm,
    amzDate,
    credentialScope,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
  ].join('\n');

  const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=host;x-amz-date, Signature=${signature}`;

  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Amz-Date': amzDate,
    Authorization: authorizationHeader,
  };

  const response = await axios.post(endpoint, body, { headers });
  return response.data;
}
