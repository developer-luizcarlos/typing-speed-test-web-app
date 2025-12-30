"use client";

import styles from "./page.module.css";

import Header from "@/components/Header/Header";

export default function Home() {
	return (
		<div className={`${styles}`}>
			<Header />
			<main className={`${styles.main}`}></main>
		</div>
	);
}
