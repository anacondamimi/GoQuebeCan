import Image from 'next/image';

export default function TestYouTube() {
  return (
    <Image
      src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
      alt="Test YouTube Thumbnail"
      width={480}
      height={360}
    />
  );
}
