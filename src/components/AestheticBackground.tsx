import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface AestheticBackgroundProps {
  variant?: 'home' | 'about' | 'services' | 'portfolio' | 'contact' | 'careers';
  className?: string;
}

const AestheticBackground: React.FC<AestheticBackgroundProps> = ({ 
  variant = 'home', 
  className = '' 
}) => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Floating particles system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
      maxLife: number;
      angle: number;
      angleSpeed: number;
    }> = [];

    // Create particle
    const createParticle = (x?: number, y?: number) => {
      const colors = isDark 
        ? ['#00B5FF', '#01F9C6', '#3B82F6', '#06B6D4', '#8B5CF6', '#EC4899']
        : ['#00B5FF', '#01F9C6', '#60A5FA', '#34D399', '#A78BFA', '#F472B6'];
      
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 400 + 300,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02
      };
    };

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle());
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseInfluence = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseInfluence = 1;
    };

    const handleMouseLeave = () => {
      mouseInfluence = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradually reduce mouse influence
      mouseInfluence *= 0.95;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Mouse interaction
        if (mouseInfluence > 0.1) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150 * mouseInfluence * 0.01;
            particle.vx += dx * force;
            particle.vy += dy * force;
          }
        }

        // Update position with floating motion
        particle.angle += particle.angleSpeed;
        particle.x += particle.vx + Math.sin(particle.angle) * 0.5;
        particle.y += particle.vy + Math.cos(particle.angle) * 0.3;
        particle.life++;

        // Apply gentle drift
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Fade out over time
        const lifeFactor = 1 - (particle.life / particle.maxLife);
        const currentOpacity = particle.opacity * lifeFactor;

        // Remove dead particles
        if (particle.life >= particle.maxLife || currentOpacity <= 0) {
          particles.splice(i, 1);
          particles.push(createParticle());
          continue;
        }

        // Wrap around edges with smooth transition
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Draw particle with glow effect
        ctx.save();
        
        // Outer glow
        ctx.globalAlpha = currentOpacity * 0.3 * (isDark ? 1 : 0.7);
        ctx.fillStyle = particle.color;
        ctx.filter = 'blur(8px)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner particle
        ctx.filter = 'none';
        ctx.globalAlpha = currentOpacity * (isDark ? 0.9 : 0.7);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const connectionOpacity = (1 - distance / 120) * currentOpacity * 0.4;
            ctx.save();
            ctx.globalAlpha = connectionOpacity * (isDark ? 0.8 : 0.5);
            
            // Create gradient line
            const gradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y);
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, other.color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <div className={`fixed inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Base gradient background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900'
          : 'bg-gradient-to-br from-white via-blue-50 to-indigo-50'
      }`}>
        
        {/* Animated canvas for particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }}
        />

        {/* Large floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Morphing blob 1 */}
          <div 
            className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-float ${
              isDark ? 'opacity-10' : 'opacity-5'
            }`}
            style={{
              background: isDark 
                ? 'radial-gradient(ellipse 80% 120% at 50% 50%, #00B5FF 0%, transparent 70%)'
                : 'radial-gradient(ellipse 80% 120% at 50% 50%, #00B5FF 0%, transparent 80%)',
              filter: 'blur(100px)',
              animationDuration: '25s',
              animationDelay: '0s',
              transform: 'rotate(45deg)'
            }}
          />
          
          {/* Morphing blob 2 */}
          <div 
            className={`absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full animate-float ${
              isDark ? 'opacity-8' : 'opacity-4'
            }`}
            style={{
              background: isDark
                ? 'radial-gradient(ellipse 120% 80% at 50% 50%, #01F9C6 0%, transparent 70%)'
                : 'radial-gradient(ellipse 120% 80% at 50% 50%, #01F9C6 0%, transparent 80%)',
              filter: 'blur(90px)',
              animationDuration: '30s',
              animationDelay: '5s',
              transform: 'rotate(-30deg)'
            }}
          />

          {/* Floating geometric shapes */}
          <div 
            className={`absolute top-1/3 right-1/4 w-40 h-40 ${
              isDark ? 'opacity-15' : 'opacity-8'
            } animate-float`}
            style={{
              background: 'linear-gradient(45deg, #00B5FF, #8B5CF6)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: 'blur(3px)',
              animationDuration: '20s',
              animationDelay: '3s'
            }}
          />

          <div 
            className={`absolute bottom-1/4 left-1/3 w-32 h-32 ${
              isDark ? 'opacity-12' : 'opacity-6'
            } animate-float`}
            style={{
              background: 'linear-gradient(135deg, #01F9C6, #EC4899)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              filter: 'blur(2px)',
              animationDuration: '22s',
              animationDelay: '8s'
            }}
          />

          {/* Hexagonal shapes */}
          <div 
            className={`absolute top-2/3 left-1/6 w-24 h-24 ${
              isDark ? 'opacity-10' : 'opacity-5'
            } animate-float`}
            style={{
              background: 'linear-gradient(60deg, #00B5FF, #F472B6)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              filter: 'blur(2px)',
              animationDuration: '28s',
              animationDelay: '12s'
            }}
          />

          {/* Diamond shape */}
          <div 
            className={`absolute top-1/6 left-2/3 w-28 h-28 ${
              isDark ? 'opacity-8' : 'opacity-4'
            } animate-float`}
            style={{
              background: 'linear-gradient(45deg, #8B5CF6, #01F9C6)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              filter: 'blur(2px)',
              animationDuration: '24s',
              animationDelay: '15s'
            }}
          />

          {/* Organic blob shape */}
          <div 
            className={`absolute bottom-1/6 right-1/6 w-36 h-36 ${
              isDark ? 'opacity-12' : 'opacity-6'
            } animate-float`}
            style={{
              background: 'linear-gradient(120deg, #EC4899, #00B5FF)',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              filter: 'blur(4px)',
              animationDuration: '26s',
              animationDelay: '18s'
            }}
          />
        </div>

        {/* Subtle mesh gradient overlay */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'}`}
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #00B5FF 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, #01F9C6 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, #8B5CF6 0%, transparent 50%),
              radial-gradient(circle at 60% 20%, #EC4899 0%, transparent 50%)
            `
          }}
        />

        {/* Animated grid pattern */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-[0.02]' : 'opacity-[0.015]'}`}
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(0, 181, 255, 0.1)' : 'rgba(0, 181, 255, 0.05)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(0, 181, 255, 0.1)' : 'rgba(0, 181, 255, 0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridMove 40s linear infinite'
          }}
        />

        {/* Subtle noise texture */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-[0.015]' : 'opacity-[0.01]'}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: isDark ? 'overlay' : 'multiply'
          }}
        />
      </div>
    </div>
  );
};

export default AestheticBackground;