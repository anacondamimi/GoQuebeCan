// app/head.tsx
export default function Head() {
  return (
    <>
      {/* standard */}
      <meta name="impact-site-verification" content="b3e59d2b-b9c5-4a0d-bcf3-caccc26c52a4" />

      {/* version EXACTE demandée par Impact (on force l'attribut value) */}
      {/* @ts-expect-error Impact expects `value` attribute */}
      <meta name="impact-site-verification" value="b3e59d2b-b9c5-4a0d-bcf3-caccc26c52a4" />
    </>
  );
}
