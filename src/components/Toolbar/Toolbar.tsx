"use client";

import styles from "./toolbar.module.css";

import Pill from "../Pill/Pill";

import {convertSecondsToMinutesAndSeconds} from "@/helpers/convertSecondsToMinutesAndSeconds";

import {GameContext} from "@/context/GameContext/GameProvider";

import {useContext} from "react";

interface Props {
	accuracyValue: number;
	timeValue: number;
	wpmValue: number;
	handleEasyPillClick: () => void;
	handleHardPillClick: () => void;
	handleMediumPillClick: () => void;
	handlePassagePillClick: () => void;
	handleTimedPillClick: () => void;
}

export default function Toolbar({
	accuracyValue,
	timeValue,
	wpmValue,
	handleEasyPillClick,
	handleHardPillClick,
	handleMediumPillClick,
	handlePassagePillClick,
	handleTimedPillClick,
}: Props) {
	const {difficult, mode} = useContext(GameContext)!;

	return (
		<div className={`${styles.toolbar}`}>
			<dl className={`${styles.game_info}`}>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>WPM:</dt>
					<dd className={`${styles.dd} ${styles.dd_wpm}`}>
						{wpmValue < 10 ? `0${wpmValue}` : wpmValue}
					</dd>
				</div>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>Accuracy:</dt>
					<dd className={`${styles.dd} ${styles.dd_accuracy}`}>
						{accuracyValue}%
					</dd>
				</div>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>Time</dt>
					<dd className={`${styles.dd} ${styles.dd_time}`}>
						{convertSecondsToMinutesAndSeconds(timeValue)}
					</dd>
				</div>
			</dl>
			<div className={`${styles.game_config_container}`}>
				<div className={`${styles.game_config}`}>
					<span className={`${styles.pseudo_label}`}>Difficult: </span>
					<div className={`${styles.group}`}>
						<Pill
							isHighlighted={difficult === "EASY"}
							label="Easy"
							handleClick={handleEasyPillClick}
						/>
						<Pill
							isHighlighted={difficult === "MEDIUM"}
							label="Medium"
							handleClick={handleMediumPillClick}
						/>
						<Pill
							isHighlighted={difficult === "HARD"}
							label="Hard"
							handleClick={handleHardPillClick}
						/>
					</div>
				</div>
				<div className={`${styles.game_config}`}>
					<span className={`${styles.pseudo_label}`}>Mode:</span>
					<div className={`${styles.group}`}>
						<Pill
							isHighlighted={mode === "TIMED"}
							label="Timed (60s)"
							handleClick={handleTimedPillClick}
						/>
						<Pill
							isHighlighted={mode === "PASSAGE"}
							label="Passage"
							handleClick={handlePassagePillClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
