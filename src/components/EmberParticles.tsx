import React, { useEffect, useRef } from 'react';

const EmberParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Partícula
    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 200; // Começa abaixo da tela
        this.size = Math.random() * 4.0 + 1.5; // Partículas maiores
        this.speedY = -(Math.random() * 2.5 + 1.0); // Sobe mais rápido
        this.speedX = (Math.random() - 0.5) * 1.5; // Deriva mais forte
        this.opacity = Math.random() * 0.9 + 0.3; // Mais opacas
        this.fadeSpeed = Math.random() * 0.015 + 0.005;
        
        // Cores de brasa: laranjas, amarelos, vermelhos
        const colors = ['#ff6b00', '#ff8a00', '#ffb800', '#ff4500'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(height: number) {
        this.y += this.speedY;
        this.x += this.speedX;
        
        // Flicker effect
        if (Math.random() > 0.95) {
          this.opacity += (Math.random() - 0.5) * 0.3;
        } else {
          this.opacity -= this.fadeSpeed;
        }

        // Clamp opacity
        this.opacity = Math.max(0, Math.min(1, this.opacity));

        // Respawn
        if (this.y < -50 || this.opacity <= 0) {
          this.y = height + Math.random() * 100;
          this.x = Math.random() * canvas!.width;
          this.opacity = Math.random() * 0.8 + 0.2;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        // Adiciona um leve brilho
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.color;
        
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      // Aumentando a quantidade de partículas
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(canvas.height);
        particle.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default EmberParticles;
