import styles from "./header.module.css";

import Image from "next/image.js";

import Toolbar from "../Toolbar/Toolbar";

export default function Header() {
	return (
		<header className={`${styles.header}`}>
			<div className={`${styles.presentation}`}>
				<Image
					src={"/images/logo-large.svg"}
					alt="logo"
					height={50}
					width={250}
				/>
				<div className={`${styles.personal_best_container}`}>
					<Image
						src={"/images/icon-personal-best.svg"}
						alt="trophy icon"
						height={20}
						width={20}
						className={`${styles.trophy_icon}`}
					/>
					<dl className={`${styles.dl}`}>
						<dt className={`${styles.dt}`}>Personal best:</dt>
						<dd className={`${styles.dd}`}>00 WPM</dd>
					</dl>
				</div>
			</div>
			<Toolbar />
		</header>
	);
}
