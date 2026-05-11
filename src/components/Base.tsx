import React from 'react';

type BaseProps = {
  colorClass: string;
  innerClass: string;
  size?: number;
};

const Base: React.FC<BaseProps> = ({ colorClass, innerClass, size = 40 }) => {
  const cells = Array.from({ length: 6 * 6 }, (_, i) => {
    const row = Math.floor(i / 6);
    const col = i % 6;
    const isInner = row >= 1 && row <= 4 && col >= 1 && col <= 4;

    return (
      <div
        key={`${row}-${col}`}
        className={`border border-gray-300 ${isInner ? innerClass : colorClass}`}
        style={{ width: size, height: size }}
      />
    );
  });

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(6, ${size}px)` }}
    >
      {cells}
    </div>
  );
};

export default Base;