import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }[] = [];

    const colors = ["#C1121F", "#D4AF37", "#600A10", "#8D6E12"];

    function createParticles() {
      particles = [];
      const density = Math.min(60, Math.floor((width * height) / 22000));
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.2
        });
      }
    }

    // Set dimensions with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: boxWidth, height: boxHeight } = entry.contentRect;
        width = boxWidth || window.innerWidth;
        height = boxHeight || window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createParticles();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Capture mouse movement for a slight pull effect
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Micro attraction to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += dx * 0.005;
          p.y += dy * 0.005;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full opacity-60" />
    </div>
  );
}
