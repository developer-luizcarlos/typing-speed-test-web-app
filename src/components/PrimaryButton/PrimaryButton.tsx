import styles from "./primaryButton.module.css";

interface Props {
	handleCLick: () => void;
	label: string;
}

export default function PrimaryButton({handleCLick, label}: Props) {
	return (
		<button className={`${styles.primary_btn}`} onClick={handleCLick}>
			{label}
		</button>
	);
}
