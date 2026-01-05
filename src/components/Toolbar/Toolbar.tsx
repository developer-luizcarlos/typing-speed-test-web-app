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

const Toolbar: React.FC<Props> = ({
	accuracyValue,
	timeValue,
	wpmValue,
	handleEasyPillClick,
	handleHardPillClick,
	handleMediumPillClick,
	handlePassagePillClick,
	handleTimedPillClick,
}: Props) => {
	const {difficult, mode} = useContext(GameContext)!;

	return (
		<div className={`${styles.toolbar}`}>
			<dl className={`${styles.gameInfo}`}>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>WPM:</dt>
					<dd className={`${styles.dd} ${styles.ddWpm}`}>
						{wpmValue < 10 ? `0${wpmValue}` : wpmValue}
					</dd>
				</div>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>Accuracy:</dt>
					<dd className={`${styles.dd} ${styles.ddAccuracy}`}>
						{accuracyValue}%
					</dd>
				</div>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>Time</dt>
					<dd className={`${styles.dd} ${styles.ddTime}`}>
						{convertSecondsToMinutesAndSeconds(timeValue)}
					</dd>
				</div>
			</dl>
			<div className={`${styles.gameConfigContainer}`}>
				<div className={`${styles.gameConfig}`}>
					<span className={`${styles.pseudoLabel}`}>Difficult: </span>
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
				<div className={`${styles.gameConfig}`}>
					<span className={`${styles.pseudoLabel}`}>Mode:</span>
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
};

export default Toolbar;
