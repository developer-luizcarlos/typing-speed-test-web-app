"use client";

import styles from "./page.module.css";

import Image from "next/image.js";

import Header from "@/components/Header/Header";

import {TextsObject} from "@/types/textsObject.types";

import {useEffect, useState} from "react";

export default function Home() {
	const [textsObject, setTextsObject] = useState<TextsObject | null>(null);

	useEffect(() => {
		async function fetchTextsObject(): Promise<TextsObject> {
			const response = await fetch("data.json");
			const textsObject = (await response.json()) as TextsObject;

			return textsObject;
		}

		fetchTextsObject().then(setTextsObject);
	}, []);

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
