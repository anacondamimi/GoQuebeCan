import type { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://192.168.2.170:3008', // ← ton IP locale si besoin
  'https://goquebecan.com', // ← ton domaine final
];

export function runCorsMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin || '';
  const isAllowed = allowedOrigins.includes(origin);

  res.setHeader('Access-Control-Allow-Origin', isAllowed ? origin : 'null');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }

  return false;
}
