'use client';

import { useEffect, useRef } from 'react';

export default function MountainLandscape() {
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
    let time = 0;
    const speed = 0.005;
    const numLayers = 8;

    // Generate simple mountain silhouette with smooth edges
    const generateMountainSilhouette = (seed: number) => {
      const points = [];
      const numPoints = 20; // More points for smoother curves
      
      for (let i = 0; i <= numPoints; i++) {
        const x = (i / numPoints);
        
        // Generate base height with multiple harmonics
        let height = Math.sin(x * Math.PI * 2.5 + seed) * 0.3 + 
                     Math.sin(x * Math.PI * 5 + seed * 1.5) * 0.15 + 
                     Math.sin(x * Math.PI * 1.2 + seed * 0.7) * 0.4;
        
        // Smooth the edges to prevent harsh drops
        const edgeDistance = Math.min(x, 1 - x); // Distance from nearest edge
        const edgeSmoothing = Math.min(1, edgeDistance / 0.15); // Smooth within 15% of edges
        height *= edgeSmoothing;
        
        points.push({ x, y: height });
      }
      
      return points;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += speed;

      // Draw mountain layers from back to front
      for (let layer = 0; layer < numLayers; layer++) {
        // Calculate position in cycle (0 = far, 1 = close)
        const cyclePosition = ((layer + time) % numLayers) / numLayers;
        
        // Vertical position - starts high, moves down as it gets closer
        const yPosition = canvas.height * (0.2 + cyclePosition * 0.6); // From 20% to 80% down screen
        
        // Dramatic zoom scaling - mountains get much larger as they approach
        const zoomScale = Math.pow(cyclePosition, 1.5); // Exponential scaling for zoom effect
        const heightScale = 30 + zoomScale * 400; // From 30px to 430px tall
        const widthScale = 0.5 + zoomScale * 2; // Horizontal stretch as they zoom in
        
        // Color transition from blue to purple
        const blue = { r: 9, g: 30, b: 255 };    // #091EFF
        const purple = { r: 255, g: 40, b: 176 }; // #FF28B0
        
        const colorProgress = cyclePosition;
        const r = Math.round(blue.r + (purple.r - blue.r) * colorProgress);
        const g = Math.round(blue.g + (purple.g - blue.g) * colorProgress);
        const b = Math.round(blue.b + (purple.b - blue.b) * colorProgress);
        
        // Opacity transition from low to high, with smooth fade-in and fade-out
        let opacity = 0.2 + cyclePosition * 0.7; // From 0.2 to 0.9
        
        // Fade in the first 15% of the cycle very gradually
        if (cyclePosition < 0.15) {
          const fadeInProgress = cyclePosition / 0.15; // 0 to 1 over first 15%
          opacity *= fadeInProgress; // Start from 0 and fade in
        }
        
        // Fade out the last 10% of the cycle to prevent jarring disappearance
        if (cyclePosition > 0.9) {
          const fadeOutProgress = (cyclePosition - 0.9) / 0.1; // 0 to 1 over last 10%
          opacity *= (1 - fadeOutProgress); // Fade to 0
        }
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        // Generate and draw mountain silhouette
        const mountainPoints = generateMountainSilhouette(layer * 123.456); // Different seed per layer
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        // Start from left edge at baseline
        ctx.lineTo(0, yPosition);
        
        mountainPoints.forEach((point) => {
          // Apply zoom effect by scaling from center, but clamp to screen bounds
          const centerX = canvas.width * 0.5;
          const scaledX = centerX + (point.x - 0.5) * canvas.width * widthScale;
          // Clamp to screen bounds to prevent edge issues
          const x = Math.max(0, Math.min(canvas.width, scaledX));
          const y = yPosition + point.y * heightScale;
          ctx.lineTo(x, y);
        });
        
        // End at right edge at baseline
        ctx.lineTo(canvas.width, yPosition);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
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
    </div>
  );
} 