import React, { useState } from 'react';
import Board from './Board';
import Dice from './Dice';

type PawnState = {
  id: string;
  color: 'red' | 'green' | 'blue' | 'yellow';
  pos: number | null;
  base: { row: number; col: number };
};

const track = [
  { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 },
  { row: 5, col: 6 }, { row: 4, col: 6 }, { row: 3, col: 6 }, { row: 2, col: 6 }, { row: 1, col: 6 },
  { row: 0, col: 6 }, { row: 0, col: 7 }, { row: 0, col: 8 },
  { row: 1, col: 8 }, { row: 2, col: 8 }, { row: 3, col: 8 }, { row: 4, col: 8 }, { row: 5, col: 8 },
  { row: 6, col: 9 }, { row: 6, col: 10 }, { row: 6, col: 11 }, { row: 6, col: 12 }, { row: 6, col: 13 },
  { row: 6, col: 14 }, { row: 7, col: 14 }, { row: 8, col: 14 },
  { row: 8, col: 13 }, { row: 8, col: 12 }, { row: 8, col: 11 }, { row: 8, col: 10 }, { row: 8, col: 9 },
  { row: 9, col: 8 }, { row: 10, col: 8 }, { row: 11, col: 8 }, { row: 12, col: 8 }, { row: 13, col: 8 },
  { row: 14, col: 8 }, { row: 14, col: 7 }, { row: 14, col: 6 },
  { row: 13, col: 6 }, { row: 12, col: 6 }, { row: 11, col: 6 }, { row: 10, col: 6 }, { row: 9, col: 6 },
  { row: 8, col: 5 }, { row: 8, col: 4 }, { row: 8, col: 3 }, { row: 8, col: 2 }, { row: 8, col: 1 },
  { row: 8, col: 0 }, { row: 7, col: 0 }, { row: 6, col: 0 },
];

const startIndex: Record<PawnState['color'], number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

const nextTurn = (t: PawnState['color']) =>
  t === 'red' ? 'green' : t === 'green' ? 'yellow' : t === 'yellow' ? 'blue' : 'red';

const Game: React.FC = () => {
  const [turn, setTurn] = useState<PawnState['color']>('red');
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [actionPhase, setActionPhase] = useState<'rolling' | 'moving'>('rolling');
  const [extraRollActive, setExtraRollActive] = useState(false);
  const [pawns, setPawns] = useState<PawnState[]>([
    { id: 'r1', color: 'red', pos: null, base: { row: 2, col: 2 } },
    { id: 'r2', color: 'red', pos: null, base: { row: 2, col: 3 } },
    { id: 'r3', color: 'red', pos: null, base: { row: 3, col: 2 } },
    { id: 'r4', color: 'red', pos: null, base: { row: 3, col: 3 } },
    { id: 'g1', color: 'green', pos: null, base: { row: 2, col: 11 } },
    { id: 'g2', color: 'green', pos: null, base: { row: 2, col: 12 } },
    { id: 'g3', color: 'green', pos: null, base: { row: 3, col: 11 } },
    { id: 'g4', color: 'green', pos: null, base: { row: 3, col: 12 } },
    { id: 'b1', color: 'blue', pos: null, base: { row: 11, col: 2 } },
    { id: 'b2', color: 'blue', pos: null, base: { row: 11, col: 3 } },
    { id: 'b3', color: 'blue', pos: null, base: { row: 12, col: 2 } },
    { id: 'b4', color: 'blue', pos: null, base: { row: 12, col: 3 } },
    { id: 'y1', color: 'yellow', pos: null, base: { row: 11, col: 11 } },
    { id: 'y2', color: 'yellow', pos: null, base: { row: 11, col: 12 } },
    { id: 'y3', color: 'yellow', pos: null, base: { row: 12, col: 11 } },
    { id: 'y4', color: 'yellow', pos: null, base: { row: 12, col: 12 } },
  ]);

  const hasMove = (value: number, color: PawnState['color']) =>
    pawns.some((p) => p.color === color && (p.pos !== null || value === 6));

  const onRoll = () => {
    if (actionPhase !== 'rolling') return;

    // Generăm un număr de la 1 la 100 pentru a aplica șansa de 30%
    const rollChance = Math.floor(Math.random() * 100) + 1;
    let value;

    if (rollChance <= 30) {
      value = 6; // 30% șanse să pice 6
    } else {
      value = Math.floor(Math.random() * 5) + 1; // 70% șanse să pice 1, 2, 3, 4 sau 5
    }
    
    setDiceValue(value);

    // Verificăm dacă jucătorul are ce să mute cu zarul picat
    if (!hasMove(value, turn)) {
      setTimeout(() => {
        // Dacă nu are mutări, trece rândul și resetăm aruncarea bonus
        setTurn((t) => nextTurn(t));
        setDiceValue(null);
        setActionPhase('rolling');
      }, 800);
      return;
    }

    // Dacă are mutări valide, așteptăm click pe pion
    setActionPhase('moving');
  };
 const onPawnClick = (pawnId: string) => {
    if (actionPhase !== 'moving' || diceValue === null) return;

    const clickedPawn = pawns.find((p) => p.id === pawnId);
    if (!clickedPawn || clickedPawn.color !== turn) return;

    let isMoveValid = false;
    let nextPos = clickedPawn.pos;

    if (clickedPawn.pos === null) {
      if (diceValue === 6) {
        isMoveValid = true;
        nextPos = startIndex[clickedPawn.color];
      }
    } else {
      isMoveValid = true;
      nextPos = (clickedPawn.pos + diceValue) % track.length;
    }

    if (!isMoveValid) return;

    // --- LOGICA NOUĂ: MÂNCATUL PIONILOR ---
    setPawns((prev) => {
      return prev.map((p) => {
        // Dacă este pionul pe care abia l-am mutat, îi actualizăm poziția
        if (p.id === pawnId) {
          return { ...p, pos: nextPos };
        }
        // Dacă e un pion INAMIC și stătea exact pe căsuța unde am aterizat, îl trimitem acasă (pos: null)
        if (p.color !== turn && p.pos === nextPos) {
          return { ...p, pos: null };
        }
        // Restul pionilor rămân la fel
        return p;
      });
    });

    // Logica pentru extra aruncare la 6 rămâne la fel
    if (diceValue === 6 && !extraRollActive) {
      setExtraRollActive(true); 
      setDiceValue(null);
      setActionPhase('rolling');
    } else {
      setExtraRollActive(false); 
      setTurn((t) => nextTurn(t));
      setDiceValue(null);
      setActionPhase('rolling');
    }
  };

  const renderPawns = pawns.map((p) => {
    if (p.pos === null) {
      return { id: p.id, color: p.color, row: p.base.row, col: p.base.col };
    }
    const cell = track[p.pos];
    return { id: p.id, color: p.color, row: cell.row, col: cell.col };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">Turn: {turn}</div>
        {/* Folosim || în loc de ?? pentru ca null să fie 0 curat */}
        <Dice value={diceValue || 0} onRoll={onRoll} disabled={actionPhase !== 'rolling'} />
        <div className="text-xs text-gray-500">Phase: {actionPhase}</div>
      </div>
      <Board pawns={renderPawns} onPawnClick={onPawnClick} />
    </div>
  );
};

export default Game;