"use client";

import GameDetails from "@/components/GameDetails";
import { useEffect, useRef, useState } from "react";
import GamePlay from "@/components/GamePlay";
import { GameSessionProvider } from "@/context/useGameSession";

const GamePage = () => {
  const gamePanelRef = useRef<HTMLDivElement>(null);
  const [gamePanelOffset, setGamePanelOffset] = useState<number>(0);

  useEffect(() => {
    setGamePanelOffset(gamePanelRef.current?.clientHeight ?? 0);
  }, [gamePanelRef.current]);

  return (
    <GameSessionProvider>
      <GamePlay gamePanelOffset={gamePanelOffset} />
      <GameDetails ref={gamePanelRef} />
    </GameSessionProvider>
  );
};

export default GamePage;
