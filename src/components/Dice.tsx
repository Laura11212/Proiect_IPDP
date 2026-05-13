import React from 'react';

type DiceProps = {
  value: number;
  onRoll?: () => void;
  disabled?: boolean;
};

const Dice: React.FC<DiceProps> = ({ value, onRoll, disabled }) => {
  const renderDots = () => {
    if (!value || value === 0) return null;
    return (
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-2 place-items-center">
        {/* Rândul 1 (Sus) */}
        <div className={`w-2.5 h-2.5 rounded-full ${value > 3 ? 'bg-black' : 'bg-transparent'}`}></div>
        <div className="w-2.5 h-2.5"></div> {/* Mijloc-sus mereu gol pe un zar clasic */}
        <div className={`w-2.5 h-2.5 rounded-full ${value > 1 ? 'bg-black' : 'bg-transparent'}`}></div>

        {/* Rândul 2 (Mijloc) */}
        <div className={`w-2.5 h-2.5 rounded-full ${value === 6 ? 'bg-black' : 'bg-transparent'}`}></div>
        <div className={`w-2.5 h-2.5 rounded-full ${value % 2 !== 0 ? 'bg-black' : 'bg-transparent'}`}></div>
        <div className={`w-2.5 h-2.5 rounded-full ${value === 6 ? 'bg-black' : 'bg-transparent'}`}></div>

        {/* Rândul 3 (Jos) */}
        <div className={`w-2.5 h-2.5 rounded-full ${value > 1 ? 'bg-black' : 'bg-transparent'}`}></div>
        <div className="w-2.5 h-2.5"></div> {/* Mijloc-jos mereu gol */}
        <div className={`w-2.5 h-2.5 rounded-full ${value > 3 ? 'bg-black' : 'bg-transparent'}`}></div>
      </div>
    );
  };
  return (
    <button
      type="button"
      onClick={onRoll}
      disabled={disabled}
      className={`w-14 h-14 rounded-xl border border-gray-300 shadow-md flex items-center justify-center transition-all duration-150
        ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-80' : 'bg-white hover:bg-gray-50 hover:shadow-lg active:scale-95'}`}
    >
      {renderDots()}
    </button>
  );
};
export default Dice;