// app/head.tsx
export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        dangerouslySetInnerHTML={{
          __html:
            '<meta name="impact-site-verification" value="b3e59d2b-b9c5-4a0d-bcf3-caccc26c52a4" />',
        }}
      />
    </>
  );
}
