import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface VortexBackgroundProps {
  className?: string;
}

const VortexBackground: React.FC<VortexBackgroundProps> = ({ className = '' }) => {
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

    // Particle system
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
      distance: number;
      speed: number;
    }> = [];

    // Vortex center
    const vortexCenter = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };

    // Create particle
    const createParticle = () => {
      const colors = isDark 
        ? ['rgba(0, 181, 255, 0.6)', 'rgba(1, 249, 198, 0.6)', 'rgba(59, 130, 246, 0.4)', 'rgba(139, 92, 246, 0.4)']
        : ['rgba(0, 181, 255, 0.4)', 'rgba(1, 249, 198, 0.4)', 'rgba(96, 165, 250, 0.3)', 'rgba(167, 139, 250, 0.3)'];
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * Math.min(canvas.width, canvas.height) * 0.6;
      
      return {
        x: vortexCenter.x + Math.cos(angle) * distance,
        y: vortexCenter.y + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 600 + 400,
        angle: angle,
        distance: distance,
        speed: Math.random() * 0.002 + 0.001
      };
    };

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      particles.push(createParticle());
    }

    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
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
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Update vortex center with subtle movement
      vortexCenter.x = canvas.width / 2 + Math.sin(time * 0.5) * 20;
      vortexCenter.y = canvas.height / 2 + Math.cos(time * 0.3) * 15;

      // Gradually reduce mouse influence
      mouseInfluence *= 0.95;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Vortex effect - particles spiral towards center
        const dx = vortexCenter.x - particle.x;
        const dy = vortexCenter.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
          // Spiral motion
          particle.angle += particle.speed;
          const spiralForce = 0.0005;
          particle.vx += (dx * spiralForce) + (-dy * particle.speed * 0.1);
          particle.vy += (dy * spiralForce) + (dx * particle.speed * 0.1);
        }

        // Mouse interaction - gentle repulsion
        if (mouseInfluence > 0.1) {
          const mouseDx = mouseX - particle.x;
          const mouseDy = mouseY - particle.y;
          const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
          
          if (mouseDistance < 100) {
            const repelForce = (100 - mouseDistance) / 100 * mouseInfluence * 0.02;
            particle.vx -= mouseDx * repelForce;
            particle.vy -= mouseDy * repelForce;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Apply damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Fade out over time
        const lifeFactor = 1 - (particle.life / particle.maxLife);
        const currentOpacity = particle.opacity * lifeFactor;

        // Remove dead particles
        if (particle.life >= particle.maxLife || currentOpacity <= 0) {
          particles.splice(i, 1);
          particles.push(createParticle());
          continue;
        }

        // Keep particles within bounds with wrapping
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = currentOpacity * (isDark ? 0.8 : 0.6);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw subtle connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const connectionDx = particle.x - other.x;
          const connectionDy = particle.y - other.y;
          const connectionDistance = Math.sqrt(connectionDx * connectionDx + connectionDy * connectionDy);

          if (connectionDistance < 80) {
            const connectionOpacity = (1 - connectionDistance / 80) * currentOpacity * 0.3;
            ctx.save();
            ctx.globalAlpha = connectionOpacity * (isDark ? 0.6 : 0.4);
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw subtle vortex center glow
      ctx.save();
      ctx.globalAlpha = 0.1 * (isDark ? 1 : 0.5);
      const gradient = ctx.createRadialGradient(
        vortexCenter.x, vortexCenter.y, 0,
        vortexCenter.x, vortexCenter.y, 100
      );
      gradient.addColorStop(0, isDark ? '#00B5FF' : '#00B5FF');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(vortexCenter.x, vortexCenter.y, 100, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

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
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient background - PROPERLY DARK */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}>
        
        {/* Animated canvas for vortex and particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: isDark ? 'screen' : 'multiply', opacity: 0.7 }}
        />

        {/* Subtle floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating blob 1 */}
          <div 
            className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-float ${
              isDark ? 'opacity-3' : 'opacity-2'
            }`}
            style={{
              background: isDark 
                ? 'radial-gradient(ellipse 80% 120% at 50% 50%, #00B5FF 0%, transparent 70%)'
                : 'radial-gradient(ellipse 80% 120% at 50% 50%, #00B5FF 0%, transparent 80%)',
              filter: 'blur(120px)',
              animationDuration: '30s',
              animationDelay: '0s',
            }}
          />
          
          {/* Floating blob 2 */}
          <div 
            className={`absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full animate-float ${
              isDark ? 'opacity-2' : 'opacity-1'
            }`}
            style={{
              background: isDark
                ? 'radial-gradient(ellipse 120% 80% at 50% 50%, #01F9C6 0%, transparent 70%)'
                : 'radial-gradient(ellipse 120% 80% at 50% 50%, #01F9C6 0%, transparent 80%)',
              filter: 'blur(100px)',
              animationDuration: '35s',
              animationDelay: '10s',
            }}
          />
        </div>

        {/* Subtle mesh gradient overlay */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-[0.015]' : 'opacity-[0.01]'}`}
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #00B5FF 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, #01F9C6 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, #8B5CF6 0%, transparent 50%)
            `
          }}
        />
      </div>
    </div>
  );
};

export default VortexBackground;