import styles from "./pill.module.css";

interface Props {
	handleClick: () => void;
	isHighlighted: boolean;
	label: string;
}

const Pill: React.FC<Props> = ({handleClick, isHighlighted, label}) => {
	return (
		<span
			className={`${styles.pill} ${isHighlighted && styles.highlighted}`}
			onClick={handleClick}
		>
			{label}
		</span>
	);
};

export default Pill;
