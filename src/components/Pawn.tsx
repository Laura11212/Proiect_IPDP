import React from 'react';

type PawnProps = {
  colorClass: string;
  onClick?: () => void;
  sizeClass?: string; // <-- Am adăugat posibilitatea de a-i trimite mărimea
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
    <div
      onClick={onClick}
      // Folosim sizeClass dacă există, altfel implicit e 'w-7 h-7'
      className={`relative cursor-pointer hover:-translate-y-1 transition-all duration-200 z-20 ${sizeClass || 'w-7 h-7'}`}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill={getFillColor()} 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-md"
      >
        <path 
          d="M 12 2 C 10 2 8.5 3.5 8.5 5.5 C 8.5 6.6 9.1 7.5 10 8 L 6.5 18 H 5 C 4.45 18 4 18.45 4 19 C 4 19.55 4.45 20 5 20 H 19 C 19.55 20 20 19.55 20 19 C 20 18.45 19.55 18 19 18 H 17.5 L 14 8 C 14.9 7.5 15.5 6.6 15.5 5.5 C 15.5 3.5 14 2 12 2 Z" 
          stroke="#ffffff" 
          strokeWidth="1.2" 
        />
      </svg>
    </div>
  );
};

export default Pawn;