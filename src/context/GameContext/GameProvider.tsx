"use client";

import {Difficult} from "@/types/difficult.types";
import {Mode} from "@/types/mode.types";
import {createContext, useState} from "react";

interface IGameContext {
	difficult: Difficult;
	level: number;
	mode: Mode;
	setDifficult: React.Dispatch<React.SetStateAction<Difficult>>;
	setLevel: React.Dispatch<React.SetStateAction<number>>;
	setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export const GameContext = createContext<IGameContext | null>(null);

interface Props {
	children: React.ReactNode;
}

const GameProvider: React.FC<Props> = ({children}) => {
	const [difficult, setDifficult] = useState<Difficult>("EASY");
	const [level, setLevel] = useState(1);
	const [mode, setMode] = useState<Mode>("TIMED");

	return (
		<GameContext
			value={{difficult, level, mode, setDifficult, setLevel, setMode}}
		>
			{children}
		</GameContext>
	);
};

export default GameProvider;
