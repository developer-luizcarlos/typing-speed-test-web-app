import styles from "./header.module.css";

import Image from "next/image.js";

interface Props {
	personalBestWPM: number;
}

const Header: React.FC<Props> = ({personalBestWPM}) => {
	return (
		<header className={`${styles.header}`}>
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
					<dd className={`${styles.dd}`}>
						{personalBestWPM < 10 ?
							`0${personalBestWPM}`
						:	personalBestWPM}{" "}
						WPM
					</dd>
				</dl>
			</div>
		</header>
	);
};

export default Header;
