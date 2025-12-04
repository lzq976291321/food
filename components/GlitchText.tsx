import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  isActive: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", isActive }) => {
  if (!isActive) {
    return <h1 className={`${className} transition-all duration-300`}>{text}</h1>;
  }

  return (
    <div className="relative inline-block">
      <h1 className={`${className} relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 animate-pulse`}>
        {text}
      </h1>
      <h1 className={`${className} absolute top-0 left-0 -ml-1 text-red-500 opacity-70 animate-bounce`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)' }}>
        {text}
      </h1>
      <h1 className={`${className} absolute top-0 left-0 ml-1 text-cyan-500 opacity-70 animate-pulse`} style={{ clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)' }}>
        {text}
      </h1>
    </div>
  );
};

export default GlitchText;
