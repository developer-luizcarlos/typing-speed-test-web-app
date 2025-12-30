"use client";

import styles from "./page.module.css";

import Image from "next/image.js";

import Header from "@/components/Header/Header";

import {TextsObject} from "@/types/textsObject.types";

import {GameContext} from "@/context/GameContext/GameProvider";

import {useContext, useEffect, useState} from "react";

import {fetchTextsObject} from "@/helpers/fetchTextsObject";
import {getTextBasedOnGivenDifficultAndLevel} from "@/helpers/getTextBasedOnGivenDifficultAndLevel";

export default function Home() {
	const {difficult, level} = useContext(GameContext)!;

	const [textsObject, setTextsObject] = useState<TextsObject | null>(null);
	const [text, setText] = useState("");

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

	return (
		<div className={`${styles}`}>
			<Header />
			<main className={`${styles.main}`}></main>
			<button className={`${styles.btn_restart}`}>
				<span>Restart Test</span>
				<Image
					src={"/images/icon-restart.svg"}
					alt="restart icon"
					height={20}
					width={20}
				/>
			</button>
		</div>
	);
}
