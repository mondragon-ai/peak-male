import React, { useEffect, useRef } from 'react';
import styles from './MarqueeText.module.css';

interface MarqueeTextProps {
  text: string;
  speed?: number;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ text, speed = 50 }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;

    if (!marqueeElement) return;

    let animationFrame: number;
    let isPaused = false;

    const animateMarquee = () => {
      if (isPaused) return;

      const { scrollWidth, clientWidth } = marqueeElement;

      if (scrollWidth <= clientWidth) {
        marqueeElement.style.transform = 'translateX(0)';
        return;
      }

      const animationDuration = (scrollWidth + clientWidth) / speed;

      marqueeElement.style.transitionDuration = `${animationDuration}s`;
      marqueeElement.style.transform = `translateX(-${scrollWidth}px)`;

      animationFrame = requestAnimationFrame(animateMarquee);
    };

    animateMarquee();

    return () => {
      isPaused = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [speed]);

  return (
    <div className={styles.marqueeContainer}>
      <div ref={marqueeRef} className={styles.marqueeText}>
        {text}
      </div>
    </div>
  );
};

export default MarqueeText;