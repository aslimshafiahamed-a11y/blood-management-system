import React, { useEffect, useState } from 'react';

export const CountUpNumber = ({ value, duration = 1.2, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Extract numbers from value string (e.g. "1,420" -> 1420, "18" -> 18)
    const match = String(value).replace(/,/g, '').match(/\d+/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(match[0], 10);
    const prefix = String(value).substring(0, String(value).indexOf(match[0]));
    const suffix = String(value).substring(String(value).indexOf(match[0]) + match[0].length);

    let start = 0;
    const steps = 30;
    const increment = targetNum / steps;
    const stepTime = (duration * 1000) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        setDisplayValue(`${prefix}${targetNum.toLocaleString()}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplayValue(`${prefix}${Math.floor(start).toLocaleString()}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
};
