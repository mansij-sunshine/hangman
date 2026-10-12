export interface gameInterfaceType {
    gameStatus: string;
    setGameStatus: React.Dispatch<React.SetStateAction<string>>;
    endGameStatus: string;
    setEndGameStatus: React.Dispatch<React.SetStateAction<string>>;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    selectedWord: string | undefined;
    setSelectedWord: React.Dispatch<React.SetStateAction<string|undefined>>
}

export interface PauseMenuProps {
    status: string;
    onClose: () => void;
}