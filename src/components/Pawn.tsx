import React from 'react';

type PawnProps = {
  colorClass: string;
  size?: number;
  onClick?: () => void;
};

const Pawn: React.FC<PawnProps> = ({ colorClass, size = 22, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border border-white shadow ${colorClass} cursor-pointer`}
      style={{ width: size, height: size }}
    />
  );
};

export default Pawn;