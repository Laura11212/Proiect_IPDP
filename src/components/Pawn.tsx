import React from 'react';
import { motion } from 'framer-motion';

type PawnProps = {
  colorClass: string;
  onClick?: () => void;
  sizeClass?: string;
};

const Pawn: React.FC<PawnProps> = ({ colorClass, onClick, sizeClass }) => {
  const getFillColor = () => {
    if (colorClass.includes('red')) return '#dc2626';
    if (colorClass.includes('green')) return '#16a34a';
    if (colorClass.includes('blue')) return '#2563eb';
    if (colorClass.includes('yellow')) return '#eab308';
    return '#333';
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.2, y: -5 }}
      whileTap={{ scale: 0.85 }}
      className={`relative cursor-pointer z-20 ${sizeClass || 'w-7 h-7'}`}
    >
      <svg viewBox="0 0 24 24" fill={getFillColor()} className="w-full h-full drop-shadow-md">
        <path
          d="M12 2C10 2 8.5 3.5 8.5 5.5C8.5 6.6 9.1 7.5 10 8L6.5 18H5C4.45 18 4 18.45 4 19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19C20 18.45 19.55 18 19 18H17.5L14 8C14.9 7.5 15.5 6.6 15.5 5.5C15.5 3.5 14 2 12 2Z"
          stroke="#ffffff"
          strokeWidth="1.2"
        />
      </svg>
    </motion.div>
  );
};

export default Pawn;