"use client";

import styles from "./toolbar.module.css";

import Pill from "../Pill/Pill";

export default function Toolbar() {
	return (
		<div className={`${styles.toolbar}`}>
			<dl className={`${styles.game_info}`}>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>WPM:</dt>
					<dd className={`${styles.dd} ${styles.dd_wpm}`}>00</dd>
				</div>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>Accuracy:</dt>
					<dd className={`${styles.dd} ${styles.dd_accuracy}`}>00%</dd>
				</div>
				<div className={`${styles.group}`}>
					<dt className={`${styles.dt}`}>Time</dt>
					<dd className={`${styles.dd} ${styles.dd_time}`}>0:00</dd>
				</div>
			</dl>
			<div className={`${styles.game_config_container}`}>
				<div className={`${styles.game_config}`}>
					<span className={`${styles.pseudo_label}`}>Difficult: </span>
					<div className={`${styles.group}`}>
						<Pill
							isHighlighted={true}
							label="Easy"
							handleClick={() => ""}
						/>
						<Pill
							isHighlighted={false}
							label="Medium"
							handleClick={() => ""}
						/>
						<Pill
							isHighlighted={false}
							label="Hard"
							handleClick={() => ""}
						/>
					</div>
				</div>
				<div className={`${styles.game_config}`}>
					<span className={`${styles.pseudo_label}`}>Mode:</span>
					<div className={`${styles.group}`}>
						<Pill
							isHighlighted={true}
							label="Timed (60s)"
							handleClick={() => console.log("ok")}
						/>
						<Pill
							isHighlighted={false}
							label="Passage"
							handleClick={() => ""}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
