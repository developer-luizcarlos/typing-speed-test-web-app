import styles from "./header.module.css";

import Image from "next/image.js";

import iconPersonalBest from "../../../images/icon-personal-best.svg";
import LargeLogo from "../../../images/logo-large.svg";

interface Props {
	personalBestWPM: number;
}

const Header: React.FC<Props> = ({personalBestWPM}) => {
	return (
		<header className={`${styles.header}`}>
			<Image src={LargeLogo} alt="logo" height={50} width={250} />
			<div className={`${styles.personalBestContainer}`}>
				<Image
					src={iconPersonalBest}
					alt="trophy icon"
					height={20}
					width={20}
					className={`${styles.trophyIcon}`}
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
