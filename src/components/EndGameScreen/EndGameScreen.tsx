import styles from "./EndGameScreen.module.css";

import Image from "next/image.js";

interface Props {
	accuracy: number;
	btnLabel: string;
	completedIconPath: string;
	correctTypedCharsQuantity: number;
	handleBtnClick: () => void;
	incorrectTypedCharsQuantity: number;
	message: string;
	title: string;
	wpm: number;
}

export default function EndGameScreen({
	accuracy,
	completedIconPath,
	correctTypedCharsQuantity,
	handleBtnClick,
	incorrectTypedCharsQuantity,
	message,
	title,
	wpm,
	btnLabel,
}: Props) {
	return (
		<div className={`${styles.end_game_screen}`}>
			<Image
				src={completedIconPath}
				alt="completed icon"
				height={70}
				width={70}
			/>
			<header className={`${styles.end_game_header}`}>
				<h1 className={`${styles.end_game_title}`}>{title}</h1>
				<p className={`${styles.end_game_message}`}>{message}</p>
			</header>
			<main className={`${styles.result_container}`}>
				<div className={`${styles.result}`}>
					<h4 className={`${styles.result_title}`}>WPM:</h4>
					<p
						className={`${styles.result_value} ${styles.result_value_wpm}`}
					>
						{wpm < 10 ? `0${wpm}` : wpm}
					</p>
				</div>
				<div className={`${styles.result}`}>
					<h4 className={`${styles.result_title}`}>Accuracy:</h4>
					<p
						className={`${styles.result_value} ${styles.result_value_accuracy}`}
					>
						{accuracy < 10 ? `0${accuracy}` : accuracy}%
					</p>
				</div>
				<div className={`${styles.result}`}>
					<h4 className={`${styles.result_title}`}>Characters:</h4>
					<p className={`${styles.result_value}`}>
						<span className={`${styles.correct_typed}`}>
							{correctTypedCharsQuantity}
						</span>
						<span className={`${styles.result_slash_divisor}`}>/</span>
						<span className={`${styles.incorrect_typed}`}>
							{incorrectTypedCharsQuantity}
						</span>
					</p>
				</div>
			</main>
			<button className={`${styles.btn}`} onClick={handleBtnClick}>
				<span>{btnLabel}</span>
				<Image
					src={"/images/icon-restart.svg"}
					alt="icon"
					height={18}
					width={18}
					className={`${styles.btn_icon}`}
				/>
			</button>
		</div>
	);
}
