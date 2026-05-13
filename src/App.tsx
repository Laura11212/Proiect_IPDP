import React, { useState } from 'react';
import Game from './components/Game';
import Lobby from './components/Lobby';

const App: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);

  const handleEnterRoom = (code: string, name: string) => {
    setRoomCode(code);
    setPlayerName(name);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {roomCode && playerName ? (
        <Game roomCode={roomCode} playerName={playerName} />
      ) : (
        <Lobby onEnterRoom={handleEnterRoom} />
      )}
    </div>
  );
};

export default App;