import styles from "./pill.module.css";

interface Props {
	handleClick: () => void;
	isHighlighted: boolean;
	label: string;
}

export default function Pill({handleClick, isHighlighted, label}: Props) {
	return (
		<span
			className={`${styles.pill} ${isHighlighted && styles.highlighted}`}
			onClick={handleClick}
		>
			{label}
		</span>
	);
}
