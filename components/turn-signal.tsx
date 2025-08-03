'use client';

import { useState, useEffect } from 'react';
import { ArrowBigRight, ArrowBigLeft } from 'lucide-react';

interface TurnSignalProps {
  direction: 'left' | 'right';
  isBlinking?: boolean;
  autoBlink?: boolean;
  blinkInterval?: number;
  blinkDelay?: number;
}

export const TurnSignal = ({
  direction,
  isBlinking = false,
  autoBlink = false,
  blinkInterval = 3000,
  blinkDelay = 0,
}: TurnSignalProps) => {
  const [internalBlinking, setInternalBlinking] = useState(false);

  useEffect(() => {
    if (!autoBlink) return;

    const interval = setInterval(() => {
      setInternalBlinking(true);
      setTimeout(() => setInternalBlinking(false), 500);
    }, blinkInterval + blinkDelay);

    return () => clearInterval(interval);
  }, [autoBlink, blinkInterval, blinkDelay]);

  const shouldBlink = isBlinking || internalBlinking;

  return (
    <div className={`relative`}>
      {direction === 'left' ? (
        <ArrowBigLeft
          fill="currentColor"
          className={`h-12 w-12 text-amber-400 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:drop-shadow-[3px_3px_0px_rgba(255,255,255,1)] dark:sm:drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] ${
            shouldBlink ? 'animate-pulse' : 'opacity-40'
          }`}
        />
      ) : (
        <ArrowBigRight
          fill="currentColor"
          className={`h-12 w-12 text-amber-400 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:drop-shadow-[3px_3px_0px_rgba(255,255,255,1)] dark:sm:drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] ${
            shouldBlink ? 'animate-pulse' : 'opacity-40'
          }`}
        />
      )}
    </div>
  );
};
