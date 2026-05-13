import React from 'react';
import Cell from './Cell';
import Pawn from './Pawn';
import { motion } from 'framer-motion';
type PawnRender = {
  id: string;
  color: 'red' | 'green' | 'blue' | 'yellow';
  row: number;
  col: number;
};

type BoardProps = {
  pawns: PawnRender[];
  onPawnClick?: (pawnId: string) => void;
};

const safeStarMap: Record<string, string> = {
  '6-1': 'text-red-500', '1-8': 'text-green-500',
  '8-13': 'text-yellow-500', '13-6': 'text-blue-500',
  '2-6': 'text-gray-400', '6-12': 'text-gray-400',
  '12-8': 'text-gray-400', '8-2': 'text-gray-400',
};

const arrowMap: Record<string, { colorClass: string; rotation: string }> = {
  '7-0':  { colorClass: 'text-red-500', rotation: '90deg' },
  '0-7':  { colorClass: 'text-green-500', rotation: '180deg' },
  '7-14': { colorClass: 'text-yellow-500', rotation: '-90deg' },
  '14-7': { colorClass: 'text-blue-500', rotation: '0deg' },
};

const Star = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-3/4 h-3/4 opacity-80 ${colorClass}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Arrow = ({ colorClass, rotation }: { colorClass: string; rotation: string }) => (
  <svg className={`w-3/4 h-3/4 opacity-90 ${colorClass}`} style={{ transform: `rotate(${rotation})` }} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6.5l-9 9 2.5 2.5L12 11.5l6.5 6.5 2.5-2.5-9-9z" />
  </svg>
);

const Board: React.FC<BoardProps> = ({ pawns, onPawnClick }) => {
  const gridSize = 15;
  const cellSize = 40;

  const isInRange = (v: number, min: number, max: number) => v >= min && v <= max;

  const cellClass = (row: number, col: number) => {
    if (isInRange(row, 6, 8) && isInRange(col, 6, 8)) return 'bg-gray-200';

    const inRedBase = isInRange(row, 0, 5) && isInRange(col, 0, 5);
    const inGreenBase = isInRange(row, 0, 5) && isInRange(col, 9, 14);
    const inBlueBase = isInRange(row, 9, 14) && isInRange(col, 0, 5);
    const inYellowBase = isInRange(row, 9, 14) && isInRange(col, 9, 14);

    if (inRedBase) return isInRange(row, 1, 4) && isInRange(col, 1, 4) ? 'bg-white' : 'bg-red-500';
    if (inGreenBase) return isInRange(row, 1, 4) && isInRange(col, 10, 13) ? 'bg-white' : 'bg-green-500';
    if (inBlueBase) return isInRange(row, 10, 13) && isInRange(col, 1, 4) ? 'bg-white' : 'bg-blue-500';
    if (inYellowBase) return isInRange(row, 10, 13) && isInRange(col, 10, 13) ? 'bg-white' : 'bg-yellow-400';

    if (row === 7 && isInRange(col, 1, 5)) return 'bg-red-400';
    if (col === 7 && isInRange(row, 1, 5)) return 'bg-green-400';
    if (row === 7 && isInRange(col, 9, 13)) return 'bg-yellow-400';
    if (col === 7 && isInRange(row, 9, 13)) return 'bg-blue-400';

    if (isInRange(row, 6, 8) || isInRange(col, 6, 8)) return 'bg-white';
    return 'bg-gray-100';
  };

  const colorToClass = (color: PawnRender['color']) => {
    if (color === 'red') return 'bg-red-600';
    if (color === 'green') return 'bg-green-600';
    if (color === 'blue') return 'bg-blue-600';
    return 'bg-yellow-500';
  };
const CenterTriangles = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Triunghiul ROȘU (Stânga) */}
      <div 
        className="absolute inset-0 bg-red-500" 
        style={{ clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)' }}
      ></div>
      {/* Triunghiul VERDE (Sus) */}
      <div 
        className="absolute inset-0 bg-green-500" 
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)' }}
      ></div>
      {/* Triunghiul GALBEN (Dreapta) */}
      <div 
        className="absolute inset-0 bg-yellow-400" 
        style={{ clipPath: 'polygon(100% 0%, 100% 100%, 50% 50%)' }}
      ></div>
      {/* Triunghiul ALBASTRU (Jos) */}
      <div 
        className="absolute inset-0 bg-blue-500" 
        style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 50%)' }}
      ></div>
      {/* Contur pentru X-ul din mijloc */}
      <div className="absolute inset-0 border border-gray-400 pointer-events-none" style={{ clipPath: 'polygon(0% 0%, 100% 100%, 100% 0%, 0% 100%)', border: '1px solid rgba(0,0,0,0.1)' }}></div>
    </div>
  );
};
const cells = Array.from({ length: gridSize * gridSize }, (_, index) => {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const isExactCenter = row === 7 && col === 7;
  const starClass = safeStarMap[`${row}-${col}`];
  const arrow = arrowMap[`${row}-${col}`];

const isPawnSlot = (row: number, col: number): string | null => {
  if (isInRange(row, 1, 4) && isInRange(col, 1, 4)) return 'red';
  if (isInRange(row, 1, 4) && isInRange(col, 10, 13)) return 'green';
  if (isInRange(row, 10, 13) && isInRange(col, 1, 4)) return 'blue';
  if (isInRange(row, 10, 13) && isInRange(col, 10, 13)) return 'yellow';
  return null;
};
  return (
     <Cell key={`${row}-${col}`} className={cellClass(row, col)} size={cellSize}>
    <div className="relative w-full h-full flex items-center justify-center">
      
      {isExactCenter && (
        <div className="absolute z-0" style={{ width: cellSize * 3, height: cellSize * 3, left: -cellSize, top: -cellSize }}>
          <CenterTriangles />
        </div>
      )}

      {starClass && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Star colorClass={starClass} />
        </div>
      )}

      {arrow && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Arrow colorClass={arrow.colorClass} rotation={arrow.rotation} />
        </div>
      )}

    

    </div>
  </Cell>
);
});
  return (
    <div className="relative border-2 border-gray-300 shadow-lg rounded overflow-hidden">
      
      {/* STRATUL 1: Tabla de joc (statică) */}
      <div
        className="grid gap-0 bg-white"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
          width: gridSize * cellSize,
          height: gridSize * cellSize,
        }}
      >
        {cells}
      </div>

      {/* STRATUL 2: Pionii Animați (Absoluți) */}
      <div className="absolute inset-0 pointer-events-none">
  {pawns.map((p) => {
    const pawnsInSameCell = pawns.filter((other) => other.row === p.row && other.col === p.col);
    const isMulti = pawnsInSameCell.length > 1;
    const indexInCell = pawnsInSameCell.findIndex((other) => other.id === p.id);

    const shift = cellSize / 4;
    const offsets = [
      { x: -shift, y: -shift },
      { x: shift,  y: -shift },
      { x: -shift, y: shift  },
      { x: shift,  y: shift  },
    ];
    const { x: offsetX, y: offsetY } = isMulti ? offsets[indexInCell] : { x: 0, y: 0 };

    const targetX = p.col * cellSize + cellSize / 2 + offsetX;
    const targetY = p.row * cellSize + cellSize / 2 + offsetY;

    return (
      <motion.div
        key={p.id}
        className="absolute pointer-events-auto"
        style={{
          width: cellSize,
          height: cellSize,
          x: -cellSize / 2,  // offset pentru centrare
          y: -cellSize / 2,
          originX: 0.5,
          originY: 0.5,
        }}
        animate={{
          left: targetX,
          top: targetY,
          scale: isMulti ? 0.6 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          duration: 0.35,
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <Pawn
            colorClass={colorToClass(p.color)}
            onClick={() => onPawnClick?.(p.id)}
            sizeClass="w-7 h-7"
          />
        </div>
      </motion.div>
    );
  })}
</div>
      
    </div>
  );
};

export default Board;