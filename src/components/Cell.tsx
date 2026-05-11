import React from 'react';

type CellProps = {
  className?: string;
  size?: number;
  children?: React.ReactNode;
};

const Cell: React.FC<CellProps> = ({ className = '', size = 40, children }) => {
  return (
    <div
      className={`border border-gray-300 flex items-center justify-center text-[10px] text-gray-500 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
};

export default Cell;