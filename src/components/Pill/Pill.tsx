import styles from "./pill.module.css";

interface Props {
	handleClick: () => void;
	isHighlighted: boolean;
	label: string;
}

const Pill: React.FC<Props> = ({handleClick, isHighlighted, label}) => {
	return (
		<button
			className={`${styles.pill} ${isHighlighted && styles.highlighted}`}
			onClick={handleClick}
		>
			{label}
		</button>
	);
};

export default Pill;
