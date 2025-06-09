'use client';

import { useEffect, useRef } from 'react';

export default function WireframeLandscape() {
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

    // Animation parameters
    const gridSize = 40;
    const speed = 0.3;
    let offset = 0;

    // Generate terrain heights with some randomness
    const generateTerrain = (x: number, z: number) => {
      return Math.sin(x * 0.02) * 30 + Math.cos(z * 0.03) * 20 + Math.sin(x * 0.008 + z * 0.005) * 40;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Safari-friendly setup (no shadowBlur for performance)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      offset += speed;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Camera placement options - uncomment one to try different views:
      
      // Option 1: High overhead view (current)
      // const horizon = centerY + 100;
      // const tiltFactor = 0.3;
      
      // Option 2: Ground level view
      // const horizon = centerY + 50;
      // const tiltFactor = -0.1;
      
      // Option 3: Side angle view
      // const horizon = centerY;
      // const tiltFactor = 0.15;
      
      // Option 4: Very high bird's eye
      const horizon = centerY + 200;
      const tiltFactor = 0.5;
      
      // Option 5: Low angle looking up
      // const horizon = centerY - 50;
      // const tiltFactor = -0.2;

      // Draw grid lines going into the distance
      for (let i = -20; i <= 20; i++) {
        for (let j = 0; j < 30; j++) {
          const z1 = j * gridSize + (offset % gridSize);
          const z2 = (j + 1) * gridSize + (offset % gridSize);
          
          if (z1 <= 0) continue;

          // Perspective projection
          const scale1 = 200 / z1;
          const scale2 = 200 / z2;
          
          // Calculate positions
          const x1 = centerX + (i * gridSize) * scale1;
          const x2 = centerX + (i * gridSize) * scale2;
          
          // Calculate terrain heights with downward tilt
          const height1 = generateTerrain(i * gridSize, z1 + offset);
          const height2 = generateTerrain(i * gridSize, z2 + offset);
          
          const y1 = horizon + height1 * scale1 + (z1 * tiltFactor);
          const y2 = horizon + height2 * scale2 + (z2 * tiltFactor);

          // Draw vertical lines (terrain grid)
          if (j === 0 || scale1 > 0.1) {
            ctx.globalAlpha = Math.max(0.1, Math.min(1, scale1 * 2));
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // Draw horizontal lines
      for (let j = 1; j < 30; j++) {
        const z = j * gridSize + (offset % gridSize);
        if (z <= 0) continue;
        
        const scale = 200 / z;
        if (scale < 0.05) continue;

        ctx.globalAlpha = Math.max(0.1, Math.min(1, scale * 2));
        ctx.beginPath();
        
        let firstPoint = true;
        for (let i = -20; i <= 20; i++) {
          const x = centerX + (i * gridSize) * scale;
          const height = generateTerrain(i * gridSize, z + offset);
          const y = horizon + height * scale + (z * tiltFactor);
          
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'black' }}
      />
      {/* Gradient overlay to blend with content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
} 