import React, { useState } from 'react';
import Game from './components/Game';
import Lobby from './components/Lobby';

const App: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);

  const handleEnterRoom = (code: string) => {
    setRoomCode(code);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {roomCode ? <Game roomCode={roomCode} /> : <Lobby onEnterRoom={handleEnterRoom} />}
    </div>
  );
};

export default App;