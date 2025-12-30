"use client";

import styles from "./page.module.css";

import Image from "next/image.js";

import Header from "@/components/Header/Header";

export default function Home() {
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
