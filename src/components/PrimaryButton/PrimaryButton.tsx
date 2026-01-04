import styles from "./primaryButton.module.css";

interface Props {
	handleCLick: () => void;
	label: string;
}

const PrimaryButton: React.FC<Props> = ({handleCLick, label}) => {
	return (
		<button className={`${styles.primary_btn}`} onClick={handleCLick}>
			{label}
		</button>
	);
};

export default PrimaryButton;
