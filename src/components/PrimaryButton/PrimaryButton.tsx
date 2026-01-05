import styles from "./primaryButton.module.css";

interface Props {
	handleCLick: () => void;
	label: string;
}

const PrimaryButton: React.FC<Props> = ({handleCLick, label}) => {
	return (
		<button className={`${styles.primaryBtn}`} onClick={handleCLick}>
			{label}
		</button>
	);
};

export default PrimaryButton;
