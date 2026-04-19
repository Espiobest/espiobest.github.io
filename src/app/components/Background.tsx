'use client';

// Fixed background layer — grain texture + ambient gradient orbs.
// This sits behind all content via z-index and pointer-events:none.
export default function Background() {
  return (
    <>
      {/* Gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Top-left — amber */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-15%',
            width: '70vw',
            height: '70vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,197,71,0.055) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom-right — cool blue */}
        <div
          style={{
            position: 'absolute',
            bottom: '-25%',
            right: '-20%',
            width: '65vw',
            height: '65vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,130,220,0.045) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Mid-left — faint violet */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '20%',
            width: '40vw',
            height: '40vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(160,120,220,0.025) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Grain texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 1,
          opacity: 0.038,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
    </>
  );
}
