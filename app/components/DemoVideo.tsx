'use client';

export default function DemoVideo() {
  return (
    <div className="aspect-video relative w-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/thewebsite.mp4" type="video/mp4" />
      </video>
    </div>
  );
} 