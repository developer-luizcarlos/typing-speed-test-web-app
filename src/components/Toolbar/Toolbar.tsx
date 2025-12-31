"use client";

import styles from "./toolbar.module.css";

import Pill from "../Pill/Pill";

import {Difficult} from "@/types/difficult.types";
import {Mode} from "@/types/mode.types";

import {GameContext} from "@/context/GameContext/GameProvider";

import {useContext} from "react";

interface Props {
	accuracyValue: number;
	timeValue: number;
	wpmValue: number;
}

export default function Toolbar({
	accuracyValue,
	timeValue,
	wpmValue,
}: Props) {
	const {difficult, mode, setDifficult, setMode} =
		useContext(GameContext)!;

	function handleDifficultPillClick(gameDifficult: Difficult) {
		if (difficult === gameDifficult) {
			return;
		}

		setDifficult(gameDifficult);
	}

	function handleModePillClick(gameMode: Mode) {
		if (mode === gameMode) {
			return;
		}

		setMode(gameMode);
	}

	return (
		<div className={`${styles.toolbar}`}>
			<dl className={`${styles.game_info}`}>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>WPM:</dt>
					<dd className={`${styles.dd} ${styles.dd_wpm}`}>{wpmValue}</dd>
				</div>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>Accuracy:</dt>
					<dd className={`${styles.dd} ${styles.dd_accuracy}`}>
						{accuracyValue}%
					</dd>
				</div>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>Time</dt>
					<dd className={`${styles.dd} ${styles.dd_time}`}>{timeValue}</dd>
				</div>
			</dl>
			<div className={`${styles.game_config_container}`}>
				<div className={`${styles.game_config}`}>
					<span className={`${styles.pseudo_label}`}>Difficult: </span>
					<div className={`${styles.group}`}>
						<Pill
							isHighlighted={difficult === "EASY"}
							label="Easy"
							handleClick={() => handleDifficultPillClick("EASY")}
						/>
						<Pill
							isHighlighted={difficult === "MEDIUM"}
							label="Medium"
							handleClick={() => handleDifficultPillClick("MEDIUM")}
						/>
						<Pill
							isHighlighted={difficult === "HARD"}
							label="Hard"
							handleClick={() => handleDifficultPillClick("HARD")}
						/>
					</div>
				</div>
				<div className={`${styles.game_config}`}>
					<span className={`${styles.pseudo_label}`}>Mode:</span>
					<div className={`${styles.group}`}>
						<Pill
							isHighlighted={mode === "TIMED"}
							label="Timed (60s)"
							handleClick={() => handleModePillClick("TIMED")}
						/>
						<Pill
							isHighlighted={mode === "PASSAGE"}
							label="Passage"
							handleClick={() => handleModePillClick("PASSAGE")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
