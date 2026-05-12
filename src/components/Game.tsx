import React, { useState } from 'react';
import Board from './Board';
import Dice from './Dice';

type PawnState = {
  id: string;
  color: 'red' | 'green' | 'blue' | 'yellow';
  pos: number | null;
  base: { row: number; col: number };
  stepsWalked: number; 
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

const homeLanes: Record<PawnState['color'], { row: number; col: number }[]> = {
  // Brațul din STÂNGA (Roșu)
  red:    [{ row: 7, col: 1 }, { row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }],
  // Brațul de SUS (Verde)
  green:  [{ row: 1, col: 7 }, { row: 2, col: 7 }, { row: 3, col: 7 }, { row: 4, col: 7 }, { row: 5, col: 7 }, { row: 6, col: 7 }],
  // Brațul din DREAPTA (Galben)
  yellow: [{ row: 7, col: 13 }, { row: 7, col: 12 }, { row: 7, col: 11 }, { row: 7, col: 10 }, { row: 7, col: 9 }, { row: 7, col: 8 }],
  // Brațul de JOS (Albastru)
  blue:   [{ row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 7 }, { row: 8, col: 7 }],
};

const startIndex: Record<PawnState['color'], number> = {
  red: 0,     // Iese la stânga (lângă casa roșie)
  green: 13,  // Iese sus (lângă casa verde)
  yellow: 26, // Iese la dreapta (lângă casa galbenă)
  blue: 39,   // Iese jos (lângă casa albastră)
};

const nextTurn = (t: PawnState['color']) =>
  t === 'red' ? 'green' : t === 'green' ? 'yellow' : t === 'yellow' ? 'blue' : 'red';

const Game: React.FC = () => {
  const [turn, setTurn] = useState<PawnState['color']>('red');
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [actionPhase, setActionPhase] = useState<'rolling' | 'moving'>('rolling');
  const [extraRollActive, setExtraRollActive] = useState(false);
  const [winner, setWinner] = useState<PawnState['color'] | null>(null);
  const [pawns, setPawns] = useState<PawnState[]>([
    { id: 'r1', color: 'red', pos: null, base: { row: 2, col: 2 }, stepsWalked: 0 },
    { id: 'r2', color: 'red', pos: null, base: { row: 2, col: 3 }, stepsWalked: 0 },
    { id: 'r3', color: 'red', pos: null, base: { row: 3, col: 2 }, stepsWalked: 0 },
    { id: 'r4', color: 'red', pos: null, base: { row: 3, col: 3 }, stepsWalked: 0 },
    { id: 'g1', color: 'green', pos: null, base: { row: 2, col: 11 }, stepsWalked: 0 },
    { id: 'g2', color: 'green', pos: null, base: { row: 2, col: 12 }, stepsWalked: 0 },
    { id: 'g3', color: 'green', pos: null, base: { row: 3, col: 11 }, stepsWalked: 0 },
    { id: 'g4', color: 'green', pos: null, base: { row: 3, col: 12 }, stepsWalked: 0 },
    { id: 'b1', color: 'blue', pos: null, base: { row: 11, col: 2 }, stepsWalked: 0 },
    { id: 'b2', color: 'blue', pos: null, base: { row: 11, col: 3 }, stepsWalked: 0 },
    { id: 'b3', color: 'blue', pos: null, base: { row: 12, col: 2 }, stepsWalked: 0 },
    { id: 'b4', color: 'blue', pos: null, base: { row: 12, col: 3 }, stepsWalked: 0 },
    { id: 'y1', color: 'yellow', pos: null, base: { row: 11, col: 11 }, stepsWalked: 0 },
    { id: 'y2', color: 'yellow', pos: null, base: { row: 11, col: 12 }, stepsWalked: 0 },
    { id: 'y3', color: 'yellow', pos: null, base: { row: 12, col: 11 }, stepsWalked: 0 },
    { id: 'y4', color: 'yellow', pos: null, base: { row: 12, col: 12 }, stepsWalked: 0 },
  ]);

  const hasMove = (value: number, color: PawnState['color']) => {
    const possibleMoves = pawns.filter((p) => {
      if (p.color !== color) return false;
      if (p.pos === null) return value === 6;
      // Verificăm exact condiția de mișcare:
      return p.stepsWalked + value <= 56;
    });

    console.log(`[Debug] Jucător: ${color}, Zar: ${value}, Mutări posibile: ${possibleMoves.length}`);
    return possibleMoves.length > 0;
  };

  const onRoll = () => {
    if (winner) return; // Dacă s-a terminat meciul, zarul se blochează definitiv!
    if (actionPhase !== 'rolling') return;

    const rollChance = Math.floor(Math.random() * 100) + 1;
    let value = rollChance <= 30 ? 6 : Math.floor(Math.random() * 5) + 1;

    setDiceValue(value);

    if (!hasMove(value, turn)) {
      console.log('Nu am mutări! Trecem la următorul...');
      // Forțăm faza de moving scurt ca să blocăm zarul vizual
      setActionPhase('moving');

      setTimeout(() => {
        setTurn((t) => nextTurn(t));
        setDiceValue(null);
        setActionPhase('rolling');
      }, 1000);
      return;
    }

    // Doar dacă are mutări trecem în faza de moving propriu-zisă
    setActionPhase('moving');
  };
  const onPawnClick = (pawnId: string) => {
    if (actionPhase !== 'moving' || diceValue === null) return;

    const clickedPawn = pawns.find((p) => p.id === pawnId);
    if (!clickedPawn || clickedPawn.color !== turn) return;

    // 1. Declarăm variabilele fără să le dăm o valoare inițială obligatorie
    let nextPos: number;
    let nextSteps: number;
    let canMove = false;

    if (clickedPawn.pos === null) {
      if (diceValue === 6) {
        canMove = true;
        nextPos = startIndex[clickedPawn.color];
        nextSteps = 0;
      } else {
        return; // Nu poate ieși din casă dacă nu e 6
      }
    } else {
      const totalStepsAfterMove = clickedPawn.stepsWalked + diceValue;

      if (totalStepsAfterMove <= 56) {
        canMove = true;
        nextSteps = totalStepsAfterMove;

        if (totalStepsAfterMove <= 50) {
          nextPos = (clickedPawn.pos + diceValue) % track.length;
        } else {
          nextPos = 100 + (totalStepsAfterMove - 51);
        }
      } else {
        return; // Zarul e prea mare pentru a intra în casă
      }
    }

    // Aici, TypeScript știe deja că dacă am ajuns sub acest punct, 
    // nextPos și nextSteps AU PRIMIT o valoare de tip number.
    
    // 1. Calculăm noua listă de pioni
    const safeSpaceIndices = [0, 8, 13, 21, 26, 34, 39, 47];
    const newPawns = pawns.map((p) => {
      if (p.id === pawnId) return { ...p, pos: nextPos, stepsWalked: nextSteps };
      if (p.color !== turn && p.pos === nextPos && nextPos < 100) {
        if (safeSpaceIndices.includes(nextPos)) return p;
        return { ...p, pos: null, stepsWalked: 0 };
      }
      return p;
    });

    // 2. Salvăm noua listă de pioni
    setPawns(newPawns);

    // 3. VERIFICARE VICTORIE 🏆
    // Ne uităm la pionii jucătorului curent
    const playerPawns = newPawns.filter((p) => p.color === turn);
    // Verificăm dacă toți au ajuns la 56 de pași
    const hasWon = playerPawns.every((p) => p.stepsWalked === 56);

    if (hasWon) {
      setWinner(turn);
      return; // Oprim funcția aici, jocul s-a terminat!
    }

    // 4. Logica normală de final de tură (dacă nu a câștigat)
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

    if (p.pos >= 100) {
      // Dacă e în casă, luăm coordonatele din homeLanes
      const homeIndex = p.pos - 100;
      const cell = homeLanes[p.color][homeIndex];
      return { id: p.id, color: p.color, row: cell.row, col: cell.col };
    }

    // Altfel, luăm de pe traseul normal
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
      <div className="relative">
        {/* Dacă există un câștigător, afișăm acest mesaj */}
        {winner && (
          <div className="absolute z-50 bg-black/80 inset-0 flex flex-col items-center justify-center rounded-lg">
            <h1
              className="text-6xl font-bold uppercase text-white mb-4 drop-shadow-lg"
              style={{ color: winner }}
            >
              {winner} WINS!
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-colors"
            >
              Joacă din nou
            </button>
          </div>
        )}

        {/* Aici ai tu deja componenta Board */}
        <Board pawns={renderPawns} onPawnClick={onPawnClick} />
      </div>
    </div>
  );
};

export default Game;