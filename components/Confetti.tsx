import React, { useEffect, useState, useRef } from 'react';
import { ConfettiParticle } from '../types';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000', '#00FF00'];
      const newParticles: ConfettiParticle[] = Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 25,
          y: (Math.random() - 0.5) * 25,
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        size: Math.random() * 15 + 5,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [active]);

  useEffect(() => {
    if (!active || particles.length === 0) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y,
            velocity: {
              x: p.velocity.x * 0.96, // Air resistance
              y: p.velocity.y * 0.96 + 0.5, // Gravity
            },
            rotation: p.rotation + p.rotationSpeed,
          }))
          .filter(p => p.y < window.innerHeight && p.y > -100 && p.x > -100 && p.x < window.innerWidth + 100)
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [active, particles.length]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;