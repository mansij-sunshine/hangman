import { createContext } from "react";

interface gameInterfaceType {
    gameStatus: string;
    setGameStatus: React.Dispatch<React.SetStateAction<string>>;
    endGameStatus: string;
    setEndGameStatus: React.Dispatch<React.SetStateAction<string>>;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const GameContext = createContext({} as gameInterfaceType)