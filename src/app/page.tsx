"use client";

import styles from "./page.module.css";

import Image from "next/image.js";

import Header from "@/components/Header/Header";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Toolbar from "@/components/Toolbar/Toolbar";

import {TextsObject} from "@/types/textsObject.types";

import {GameContext} from "@/context/GameContext/GameProvider";

import {useContext, useEffect, useMemo, useState} from "react";

import {calculateAccuracy} from "@/helpers/calculateAccuracy";
import {fetchTextsObject} from "@/helpers/fetchTextsObject";
import {getTextBasedOnGivenDifficultAndLevel} from "@/helpers/getTextBasedOnGivenDifficultAndLevel";
import {isValidKey} from "@/helpers/isValidKey";
import {preventBrowserShortcuts} from "@/helpers/preventBrowserShortcuts";

export default function Home() {
	const {difficult, level, mode, setDifficult, setMode} =
		useContext(GameContext)!;

	const [accuracy, setAccuracy] = useState(0);
	const [canPlay, setCanPlay] = useState(false);
	const [shouldRenderStartTestModal, setShouldRenderStartTestModal] =
		useState(true);
	const [textsObject, setTextsObject] = useState<TextsObject | null>(null);
	const [text, setText] = useState("");
	const [typedKeys, setTypedKeys] = useState<string[]>([]);
	const [time, setTime] = useState(0);

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

	const isAllTextCharsHighlighted = useMemo(() => {
		return typedKeys.length === text.length;
	}, [text, typedKeys]);

	const wpm = useMemo(() => {
		if (time <= 0) {
			return 0;
		}

		const calculatedWPM = Math.floor(
			(correctTypedKeysQuantity * 60) / (time * 5),
		);

		return calculatedWPM < 3 ? 0 : calculatedWPM;
	}, [correctTypedKeysQuantity, time]);

	function handleKeyboard(event: KeyboardEvent) {
		const key = event.key;

		preventBrowserShortcuts(event);

		const controlWasUsed = event.ctrlKey;

		if (!isValidKey(key) || controlWasUsed) {
			return;
		}

		setTypedKeys(t => {
			return [...t, key];
		});
	}

	function handleHideStartTestModalClick() {
		setCanPlay(true);
		setShouldRenderStartTestModal(false);
	}

	function renderTextCharsInSpans() {
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
					className={`${areSameLetter ? styles.char_right_typed : styles.char_wrong_typed}`}
				>
					{t}
				</span>
			);
		});
	}

	/**
	 * canPlay's state is going
	 * to be set to true each time
	 * game's difficult and mode
	 * changes its value.
	 */
	useEffect(() => {
		(() => {
			setCanPlay(true);
		})();
	}, [difficult, mode]);

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
			function updateCanPlay(canPlay: boolean) {
				setCanPlay(canPlay);
			}

			updateCanPlay(false);
		}
	}, [isAllTextCharsHighlighted]);

	useEffect(() => {
		function updateTime(time: number) {
			setTime(time);
		}

		updateTime(0);
	}, [text, mode]);

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

	useEffect(() => {
		if (mode === "TIMED" && time === 60) {
			function updateCanPlay(canPlay: boolean): void {
				setCanPlay(canPlay);
			}

			updateCanPlay(false);
		}
	}, [time, mode]);

	useEffect(() => {
		function updateTypedKeys() {
			setTypedKeys([]);
		}

		updateTypedKeys();
	}, [text]);

	useEffect(() => {
		fetchTextsObject().then(setTextsObject);
	}, []);

	useEffect(() => {
		if (textsObject) {
			const textBasedOnDifficultAndLevel =
				getTextBasedOnGivenDifficultAndLevel(
					textsObject,
					difficult,
					level,
				);

			function updateText() {
				setText(textBasedOnDifficultAndLevel);
			}

			updateText();
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
		// TODO: remove after refactoring handleKeyboard ↓
		const textCharsQuantity = textChars.length;

		// TODO: remove after refactoring handleKeyboard ↓
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

		function updateAccuracy(accuracy: number): void {
			setAccuracy(accuracy);
		}

		updateAccuracy(
			calculateAccuracy(correctTypedKeysQuantity, typedKeysQuantity),
		);
	}, [text, typedKeys]);

	return (
		<div className={`${styles}`}>
			<Header />
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
			<main key={text} className={`${styles.main}`}>
				<div
					className={`${styles.main_render_area} ${shouldRenderStartTestModal && styles.blur}`}
				>
					{renderTextCharsInSpans()}
				</div>
				<div
					onClick={handleHideStartTestModalClick}
					className={`${styles.start_test_container} ${!shouldRenderStartTestModal && styles.start_test_container_hidden}`}
				>
					<PrimaryButton
						label="Start Typing Test"
						handleCLick={handleHideStartTestModalClick}
					/>
					<span className={`${styles.start_test_message}`}>
						Or click the text and start typing.
					</span>
				</div>
			</main>
			{!shouldRenderStartTestModal && (
				<button className={`${styles.btn_restart}`}>
					<span>Restart Test</span>
					<Image
						src={"/images/icon-restart.svg"}
						alt="restart icon"
						height={20}
						width={20}
					/>
				</button>
			)}
		</div>
	);
}
