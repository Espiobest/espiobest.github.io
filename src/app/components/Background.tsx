'use client';

export default function Background() {
  return (
    <>
      {/* Solid base color — owns the page background so body can be transparent */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0, background: '#181818' }}
      />

      {/* Orbs — sit above base, below content */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Top-left — amber */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '55vw',
            height: '55vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,197,71,0.13) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Bottom-right — indigo */}
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-10%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100,120,200,0.09) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 2,
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
    </>
  );
}
