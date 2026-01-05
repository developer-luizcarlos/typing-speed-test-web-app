"use client";

/**
 * TODO: using indexDB, keep tracking of the
 * already achieved level on each of the game's
 * difficult. Each time the player changes the game's
 * difficult, the level to be applied will be loaded
 * from indexDB considering if its null, which
 * means the player never achieved a level before, being
 * one if it is true, otherwise will be the previously
 * achieved value.
 *
 * The achieved value will be registered on indexDB
 * each time the game ends.
 *
 * The load of the current level will occur also
 * when the player enters the web page, being loaded
 * in the corresponding difficult.
 */

import styles from "./page.module.css";

import Image from "next/image.js";

import EndGameScreen from "@/components/EndGameScreen/EndGameScreen";
import Header from "@/components/Header/Header";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Toolbar from "@/components/Toolbar/Toolbar";

import {TextsObject} from "@/types/textsObject.types";

import {GameContext} from "@/context/GameContext/GameProvider";

import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import {calculateAccuracy} from "@/helpers/calculateAccuracy";
import {fetchTextsObject} from "@/helpers/fetchTextsObject";
import {getTextBasedOnGivenDifficultAndLevel} from "@/helpers/getTextBasedOnGivenDifficultAndLevel";
import {isValidKey} from "@/helpers/isValidKey";
import {preventBrowserShortcuts} from "@/helpers/preventBrowserShortcuts";

const Home: React.FC = () => {
	// Constants
	const TIME_LIMIT = 60;

	// Game Context
	const {difficult, level, mode, setDifficult, setLevel, setMode} =
		useContext(GameContext)!;

	// States
	const [accuracy, setAccuracy] = useState(0);
	const [bestWPM, setBestWPM] = useState(0);
	const [canPlay, setCanPlay] = useState(false);
	const [completedTestsQuantity, setCompletedTestsQuantity] = useState(0);
	const [shouldRenderStartTestModal, setShouldRenderStartTestModal] =
		useState(true);
	const [textsObject, setTextsObject] = useState<TextsObject | null>(null);
	const [text, setText] = useState("");
	const [time, setTime] = useState(0);
	const [typedKeys, setTypedKeys] = useState<string[]>([]);

	// Refs
	const btnRestartRef = useRef<HTMLButtonElement>(null);

	// Memoized values

	/**
	 * Get the quantity of correct typed
	 * keys.
	 */
	const correctTypedKeysQuantity = useMemo(() => {
		const limit = typedKeys.length;

		let correct = 0;

		for (let i = 0; i < limit; i++) {
			const textCharAtIndex = text[i];
			const typedKeyAtIndex = typedKeys[i];

			const areCharsEqual = textCharAtIndex === typedKeyAtIndex;

			if (areCharsEqual) {
				correct += 1;
			}
		}

		return correct;
	}, [text, typedKeys]);

	/**
	 * Get the quantity of incorrect typed
	 * keys.
	 */
	const incorrectTypedCharsQuantity = useMemo(() => {
		/**
		 * This will used when the game ends, getting
		 * the incorrect typed keys quantity by comparing
		 * the total quantity of characters the current displayed
		 * text has and the quantity of correct typed keys. The difference
		 * between these two is the quantity of characters incorrect typed.
		 */
		return text.length - correctTypedKeysQuantity;
	}, [correctTypedKeysQuantity, text]);

	const isAllTextCharsHighlighted = useMemo(() => {
		/**
		 * If the quantity of typed keys is equals to
		 * the quantity of characters the current displayed
		 * text has, then all attempts in the text were made.
		 *
		 * This logic is used to end the game and stops the timer.
		 */

		return typedKeys.length === text.length;
	}, [text, typedKeys]);

	const isGameEnded = useMemo(() => {
		const minimumAccuracyRequired = 60;

		return (
			accuracy >= minimumAccuracyRequired && isAllTextCharsHighlighted
		);
	}, [isAllTextCharsHighlighted, accuracy]);

	const wpm = useMemo(() => {
		if (time <= 0) {
			return 0;
		}

		const calculatedWPM = Math.floor(
			(correctTypedKeysQuantity * 60) / (time * 5),
		);

		return calculatedWPM < 3 ? 0 : calculatedWPM;
	}, [correctTypedKeysQuantity, time]);

	const endGameBtnLabel = useMemo(() => {
		if (!completedTestsQuantity) {
			return "Go Again";
		}

		return "Beat this score";
	}, [completedTestsQuantity]);

	const endGameIconPath = useMemo(() => {
		if (bestWPM !== 0 && wpm > bestWPM) {
			return "/images/icon-new-pb.svg";
		}

		return "/images/icon-completed.svg";
	}, [bestWPM, wpm]);

	const endGameMessage = useMemo(() => {
		if (!completedTestsQuantity) {
			return "You've set the bar. Now the real challenge begins - time to beat it.";
		}

		if (wpm > bestWPM) {
			return "You're getting faster. That was a incredible typing.";
		}

		return "Solid run. Keep pushing to beat your high score.";
	}, [bestWPM, completedTestsQuantity, wpm]);

	const endGameTitle = useMemo(() => {
		if (!completedTestsQuantity) {
			return "Baseline Estabilished";
		}

		if (wpm > bestWPM) {
			return "High Scored Smashed!";
		}

		return "Test Completed";
	}, [bestWPM, completedTestsQuantity, wpm]);

	// Handlers
	const handleEndGameBtnClick = () => {
		const maxLevel = 10;

		setAccuracy(0);
		setTime(0);
		setTypedKeys([]);

		if (level === maxLevel) {
			setDifficult(currentDifficult => {
				if (currentDifficult === "EASY") {
					return "MEDIUM";
				} else if (currentDifficult === "MEDIUM") {
					return "HARD";
				} else {
					/**
					 * If the game is in
					 * the last difficult
					 * and last level, it
					 * starts all again.
					 */
					return "EASY";
				}
			});
		}

		setLevel(currentLevel => {
			if (currentLevel === maxLevel) {
				return 1;
			}

			return (currentLevel += 1);
		});
	};

	const handleKeyboard = (event: KeyboardEvent) => {
		const key = event.key;

		preventBrowserShortcuts(event);

		const controlWasUsed = event.ctrlKey;

		if (!isValidKey(key) || controlWasUsed) {
			return;
		}

		setTypedKeys(t => {
			return [...t, key];
		});
	};

	const handleStartTestBtnClick = () => {
		setCanPlay(true);
		setShouldRenderStartTestModal(false);
	};

	const handleBtnRestartClick = () => {
		setTypedKeys([]);
		setTime(0);

		/**
		 * Prevents triggering this handler
		 * one more time when the user is already
		 * playing and tries to insert the space
		 * character by pressing the space key.
		 */
		btnRestartRef.current!.blur();
	};

	// Other functions
	const renderTextCharsInSpans = useCallback(() => {
		const textChars = text.split("");

		return textChars.map((t, index) => {
			const isWhiteSpace = t === " ";

			const isCharIndexGreaterThanTypedLettersLength =
				index >= typedKeys.length;

			if (isWhiteSpace || isCharIndexGreaterThanTypedLettersLength) {
				return <span key={index}>{t}</span>;
			}

			const correspondingTypedKey = typedKeys[index];

			const areSameLetter = correspondingTypedKey === t;

			return (
				<span
					key={index}
					className={`${areSameLetter ? styles.charRightTyped : styles.charWrongTyped}`}
				>
					{t}
				</span>
			);
		});
	}, [text, typedKeys]);

	// Effects

	/**
	 * Get the game texts available
	 * and inserts them into a state.
	 */
	useEffect(() => {
		fetchTextsObject().then(setTextsObject);
	}, []);

	/**
	 * Load items from localStorage
	 * and sets its relatives states
	 */
	useEffect(() => {
		const savedBestWPM = +localStorage.getItem("best-wpm")!;
		const savedCompletedTestQuantity = +localStorage.getItem("completed")!;

		(() => {
			setBestWPM(savedBestWPM);
			setCompletedTestsQuantity(savedCompletedTestQuantity);
		})();
	}, []);

	/**
	 * Each time the game's difficult
	 * is changed, the game's level is set to one.
	 * This behavior has as reason the fact that,
	 * if the played upgraded his level in a difficult,
	 * this just works for that difficult, but for others
	 * the player has not upgrade the level by passing
	 * by all the previous tests in other levels in the new
	 * difficults, having the player to increase his abillities
	 * in these new difficults to get to this level in these too.
	 *
	 * Keeping the game's level while changing game's difficult
	 * even though this level was achieved in another level is
	 * considered a bug in this program.
	 */
	useEffect(() => {
		(() => {
			setLevel(1);
		})();
	}, [difficult, setLevel]);

	/**
	 * This effect performs tasks related
	 * to saving and getting information from
	 * localStorage. Firts, it compares if the
	 * last bestWPM saved is less than the current wpm,
	 * saving this one if that condition is true, having
	 * the player a new bestWPM.
	 *
	 * It also saved the number of times a user complete
	 * a test.
	 */
	useEffect(() => {
		if (isGameEnded) {
			const bestWPM = +localStorage.getItem("best-wpm")!;

			// New personal best
			if (wpm > bestWPM) {
				localStorage.setItem("best-wpm", wpm.toString());
			}

			const completedTestsQuantity = +localStorage.getItem("completed")!;
			const incrementedQuantity = completedTestsQuantity + 1;

			localStorage.setItem("completed", incrementedQuantity.toString());
		}
	}, [isGameEnded, wpm]);

	/**
	 * canPlay's state is going
	 * to be set to true each time
	 * game's difficult, level or mode
	 * change its value.
	 */
	useEffect(() => {
		(() => {
			setCanPlay(true);
		})();
	}, [difficult, level, mode]);

	/**
	 * Reset accuracy and typedKeys
	 * values each time game's mode
	 * changes its value.
	 */
	useEffect(() => {
		(() => {
			setAccuracy(0);
			setTypedKeys([]);
		})();
	}, [mode]);

	/**
	 * If all text characters are
	 * highlighted, then set canPlay's
	 * state to false.
	 */
	useEffect(() => {
		if (isAllTextCharsHighlighted) {
			(() => {
				setCanPlay(false);
			})();
		}
	}, [isAllTextCharsHighlighted]);

	/**
	 * Each time mode or text
	 * state change, the time
	 * will be set to zero.
	 */
	useEffect(() => {
		(() => {
			setTime(0);
		})();
	}, [text, mode]);

	/**
	 * After the canPlay state is
	 * setted to true, the timer starts
	 * to run.
	 */
	useEffect(() => {
		if (canPlay) {
			const timer = setInterval(() => {
				setTime(t => {
					return t + 1;
				});
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [canPlay]);

	/**
	 * If the game's mode is set to time,
	 * which is, the game has a limit to be
	 * finished and this limit is defined to 60
	 * seconds based on the constant TIME_LIMIT,
	 * the timer will stop running by setting canPlay
	 * state to false, which time depends on to run
	 * properly.
	 */
	useEffect(() => {
		if (mode === "TIMED" && time === TIME_LIMIT) {
			(() => {
				setCanPlay(false);
			})();
		}
	}, [time, mode]);

	/**
	 * Each time the current displayed
	 * text changes, typedKeys state is
	 * set to an empty array.
	 */
	useEffect(() => {
		(() => {
			setTypedKeys([]);
		})();
	}, [text]);

	useEffect(() => {
		if (textsObject) {
			const textBasedOnDifficultAndLevel =
				getTextBasedOnGivenDifficultAndLevel(
					textsObject,
					difficult,
					level,
				);

			(() => {
				setText(textBasedOnDifficultAndLevel);
			})();
		}
	}, [difficult, level, textsObject]);

	useEffect(() => {
		if (canPlay) {
			document.addEventListener("keydown", handleKeyboard);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyboard);
		};
	}, [canPlay]);

	useEffect(() => {
		const typedKeysQuantity = typedKeys.length;
		let correctTypedKeysQuantity = 0;

		const textChars = text.split("");
		const textCharsQuantity = textChars.length;

		if (typedKeysQuantity >= textCharsQuantity) {
			return;
		}

		for (let i = 0; i < typedKeysQuantity; i++) {
			const char = textChars[i];
			const key = typedKeys[i];

			if (char === key) {
				correctTypedKeysQuantity++;
			}
		}

		(() => {
			setAccuracy(
				calculateAccuracy(correctTypedKeysQuantity, typedKeysQuantity),
			);
		})();
	}, [text, typedKeys]);

	return (
		<div className={`${styles}`}>
			<Header personalBestWPM={bestWPM} />
			{!isGameEnded && (
				<Toolbar
					accuracyValue={isNaN(accuracy) ? 0 : accuracy}
					timeValue={time}
					wpmValue={isNaN(wpm) ? 0 : wpm}
					handleEasyPillClick={() =>
						shouldRenderStartTestModal ? "" : setDifficult("EASY")
					}
					handleHardPillClick={() =>
						shouldRenderStartTestModal ? "" : setDifficult("HARD")
					}
					handleMediumPillClick={() =>
						shouldRenderStartTestModal ? "" : setDifficult("MEDIUM")
					}
					handlePassagePillClick={() =>
						shouldRenderStartTestModal ? "" : setMode("PASSAGE")
					}
					handleTimedPillClick={() =>
						shouldRenderStartTestModal ? "" : setMode("TIMED")
					}
				/>
			)}
			{!isGameEnded && (
				<main key={text} className={`${styles.main}`}>
					<div
						className={`${styles.mainRenderArea} ${shouldRenderStartTestModal && styles.blur}`}
					>
						{renderTextCharsInSpans()}
					</div>
					<div
						onClick={handleStartTestBtnClick}
						className={`${styles.startTestContainer} ${!shouldRenderStartTestModal && styles.startTestContainerHidden}`}
					>
						<PrimaryButton
							label="Start Typing Test"
							handleCLick={handleStartTestBtnClick}
						/>
						<span className={`${styles.startTestMessage}`}>
							Or click the text and start typing.
						</span>
					</div>
				</main>
			)}
			{!shouldRenderStartTestModal && !isGameEnded && (
				<button
					className={`${styles.btnRestart}`}
					ref={btnRestartRef}
					onClick={handleBtnRestartClick}
				>
					<span>Restart Test</span>
					<Image
						src={"/images/icon-restart.svg"}
						alt="restart icon"
						height={20}
						width={20}
					/>
				</button>
			)}
			{isGameEnded && (
				<EndGameScreen
					accuracy={accuracy}
					btnLabel={endGameBtnLabel}
					completedIconPath={endGameIconPath}
					correctTypedCharsQuantity={correctTypedKeysQuantity}
					handleBtnClick={handleEndGameBtnClick}
					incorrectTypedCharsQuantity={incorrectTypedCharsQuantity}
					message={endGameMessage}
					title={endGameTitle}
					wpm={wpm}
				/>
			)}
		</div>
	);
};

export default Home;
