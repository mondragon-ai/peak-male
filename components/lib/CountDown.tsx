import React, { useEffect, useState } from 'react';

interface CountdownProps {
  initialCountdown: number;
}

const CountdownTimer: React.FC<CountdownProps> = ({ initialCountdown }) => {
  const [countdown, setCountdown] = useState<number>(initialCountdown);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Helper function to format time in mm:ss format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <span style={{ color: 'red' }} id={`second-${countdown}`}>
      {formatTime(countdown)}
    </span>
  );
};

export default CountdownTimer;
