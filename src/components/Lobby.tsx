import React, { useState } from 'react';

type LobbyProps = {
  onEnterRoom: (code: string) => void;
};

const Lobby: React.FC<LobbyProps> = ({ onEnterRoom }) => {
  const [inputValue, setInputValue] = useState('');

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i += 1) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const handleCreate = () => {
    const code = generateCode();
    onEnterRoom(code);
  };

  const handleJoin = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onEnterRoom(trimmed);
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 className="text-3xl font-bold">Ludo</h1>
      <button
        type="button"
        onClick={handleCreate}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Creeaza Camera Noua
      </button>
      <div className="text-xs text-gray-500">SAU</div>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Introdu codul..."
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleJoin}
        className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
      >
        Alatura-te
      </button>
    </div>
  );
};

export default Lobby;
