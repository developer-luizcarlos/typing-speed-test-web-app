"use client";

import {Difficult} from "@/types/difficult.types";
import {Mode} from "@/types/mode.types";
import {createContext, useState} from "react";

interface IGameContext {
	difficult: Difficult;
	mode: Mode;
	setDifficult: React.Dispatch<React.SetStateAction<Difficult>>;
	setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export const GameContext = createContext<IGameContext | null>(null);

interface Props {
	children: React.ReactNode;
}

export default function GameProvider({children}: Props) {
	const [difficult, setDifficult] = useState<Difficult>("EASY");
	const [mode, setMode] = useState<Mode>("TIMED");

	return (
		<GameContext value={{difficult, mode, setDifficult, setMode}}>
			{children}
		</GameContext>
	);
}
