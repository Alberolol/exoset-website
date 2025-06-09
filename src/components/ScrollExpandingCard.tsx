'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface ScrollExpandingCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollExpandingCard({ children, className = "" }: ScrollExpandingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Calculate initial scroll position to prevent jump
  const calculateScrollProgress = () => {
    if (!cardRef.current) return 0;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const cardTop = cardRef.current.offsetTop;
    
    const triggerPoint = cardTop - windowHeight;
    const expandDistance = windowHeight * 1.5;
    
    if (scrollTop < triggerPoint) {
      return 0;
    } else {
      return Math.max(0, Math.min(1, (scrollTop - triggerPoint) / expandDistance));
    }
  };

  // Calculate initial position immediately after DOM is ready
  useLayoutEffect(() => {
    if (cardRef.current) {
      const initialProgress = calculateScrollProgress();
      setScrollProgress(initialProgress);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const progress = calculateScrollProgress();
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate width based on scroll progress
  const width = 80 + (20 * scrollProgress); // From 80% to 100%
  const marginHorizontal = (100 - width) / 2; // Centered margins

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        width: `${width}%`,
        marginLeft: `${marginHorizontal}%`,
        marginRight: `${marginHorizontal}%`,
      }}
    >
      {children}
    </div>
  );
} 