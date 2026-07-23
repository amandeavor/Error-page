import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';

export default function App() {
  const [scaleY, setScaleY] = useState(1);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (textRef.current) {
        const offsetHeight = textRef.current.offsetHeight;
        if (offsetHeight > 0) {
          const newScaleY = (window.innerHeight / offsetHeight) * 1.4;
          setScaleY(newScaleY);
        }
      }
    };

    // Use a setTimeout of 100ms on mount to ensure fonts load before measuring
    const timer = setTimeout(() => {
      updateScale();
    }, 100);

    window.addEventListener('resize', updateScale);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const navLinks = ["About Us", "Programs", "Reviews", "FAQ", "Contacts"];

  const handleDoNothing = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="w-full h-screen overflow-hidden flex flex-col relative select-none"
      style={{ background: 'linear-gradient(180deg, #FF8233 0%, #FDAC55 100%)' }}
    >
      {/* BACKGROUND "404" TEXT EFFECT (Horizontal) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-80"
        style={{
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
        }}
      >
        <div 
          className="flex items-center justify-center relative"
          style={{
            transform: `scale(1.15, ${scaleY})`,
            transformOrigin: 'center',
          }}
        >
          <h1 
            ref={textRef}
            className="font-display font-extrabold text-white leading-none tracking-tighter whitespace-nowrap text-[clamp(200px,48vw,800px)]"
          >
            404
          </h1>
          <div className="absolute rounded-full bg-white h-[22vh] sm:h-[26vh] md:h-[50vh] w-[clamp(120px,20vw,400px)] z-[-1]" />
        </div>
      </div>

      {/* NAVIGATION BAR (Top Alignment) */}
      <nav className="relative z-20 flex flex-row items-center justify-between px-6 sm:px-10 md:px-16 py-5 shrink-0">
        {/* Logo (left) */}
        <a href="#" onClick={handleDoNothing} className="flex items-center gap-2.5 group cursor-pointer">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full group-hover:scale-110 transition-transform" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full group-hover:scale-110 transition-transform" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full group-hover:scale-110 transition-transform" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-display text-white text-xl sm:text-2xl font-bold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            TinyTrails
          </span>
        </a>

        {/* Desktop nav links (center/right) */}
        <div className="hidden md:flex flex-row items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              onClick={handleDoNothing}
              className="px-5 py-2 text-sm font-bold rounded-full bg-white text-[#F16524] shadow-sm hover:shadow-md active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Menu button (right) */}
        <button
          onClick={handleDoNothing}
          className="px-5 py-2.5 rounded-full text-white bg-[#F16524] hover:bg-[#d8541c] hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="w-4 h-4" />
          <span className="text-sm font-bold hidden sm:inline ml-2">Menu</span>
        </button>
      </nav>

      {/* CENTER VIDEO (Middle Alignment & Background Removal) */}
      <div className="relative flex-grow flex items-center justify-center px-4 min-h-0">
        <div className="w-full max-w-[90vw] h-full max-h-[60vh] sm:max-w-[70vw] sm:max-h-[65vh] md:max-w-[60vw] md:max-h-[70vh] flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
            style={{ mixBlendMode: 'multiply' }}
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      {/* BOTTOM CONTENT (Bottom Alignment) */}
      <div className="relative z-30 mt-auto pb-10 sm:pb-16 flex flex-col items-center text-center px-6 shrink-0">
        <h2 className="font-display text-white text-xl sm:text-2xl md:text-3xl font-bold mb-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
          Oops, something went wrong!
        </h2>
        <a
          href="#"
          onClick={handleDoNothing}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-white font-bold text-base bg-[#F16524] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </a>
      </div>
    </div>
  );
}
