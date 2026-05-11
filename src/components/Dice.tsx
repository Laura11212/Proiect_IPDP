import React from 'react';

type DiceProps = {
  value: number;
  onRoll?: () => void;
  disabled?: boolean;
};

const Dice: React.FC<DiceProps> = ({ value, onRoll, disabled }) => {
  return (
    <button
      type="button"
      onClick={onRoll}
      disabled={disabled}
      className={`w-14 h-14 rounded-lg border border-gray-300 shadow flex items-center justify-center text-2xl font-bold
        ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
    >
      {value}
    </button>
  );
};

export default Dice;