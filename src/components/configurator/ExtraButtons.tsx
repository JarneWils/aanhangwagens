import { useCallback } from "react";
import useButtonState from "../stores/useButtonState";
import { shallow } from "zustand/shallow";
// import { LuMoonStar } from "react-icons/lu";
// import { MdOutlineWbSunny } from "react-icons/md";

export default function ExtraButtons() {
	const { setSavePdf, savePdf, paying, setPaying, /* darkMode, setDarkMode */ } = useButtonState(
		(state) => ({
			setSavePdf: state.setSavePdf,
			savePdf: state.savePdf,
			paying: state.paying,
			setPaying: state.setPaying,
			// darkMode: state.darkMode,
			// setDarkMode: state.setDarkMode,
		}),
		shallow
	);

	const onHandleConfigurator = useCallback(() => {
		setSavePdf(false);
		setPaying(false);
	}, [setSavePdf, setPaying]);

	const onHandleForm = useCallback(() => {
		setSavePdf(true);
		setPaying(false);
	}, [setSavePdf, setPaying]);

	const onHandlePayment = useCallback(() => {
		setSavePdf(false);
		setPaying(true);
	}, [setSavePdf, setPaying]);

	
	// const root = document.getElementById("root");

	// const onHandleDarkMode = useCallback(() => {
	// 	if (darkMode === false && root) {
	// 		setDarkMode(true);
	// 		root.style.setProperty('--color-background', '#292929');
	// 		root.style.setProperty('--color-button-background', '#505050');
	// 		root.style.setProperty('--color-slider-background', '#505050');
	// 		root.style.setProperty('--color-dark-text', '#f8f8f8');
	// 		root.style.setProperty('--color-light-text', '#cccccc');
	// 		root.style.setProperty('--color-light-grey', '#aaaaaa');
	// 		root.style.setProperty('--color-white', '#404040');
			
	// 	} else if (darkMode === true && root) {
	// 		setDarkMode(false);
	// 		root.style.setProperty('--color-background', '#f8f8f8');
	// 		root.style.setProperty('--color-button-background', '#ffffff');
	// 		root.style.setProperty('--color-slider-background', '#dedede');
	// 		root.style.setProperty('--color-dark-text', '#323232');
	// 		root.style.setProperty('--color-light-text', '#646464');
	// 		root.style.setProperty('--color-light-grey', '#e6e6e6');
	// 		root.style.setProperty('--color-white', '#ffffff');
	// 	}
	// }, [darkMode, setDarkMode]);

	return (
		<>
			<div className="extra-buttons-container" style={{display: innerWidth > 950 ? 'flex' : 'none'}}>
				<div className="extra-btn">
					<button
						className="sva-btn"
						onClick={onHandleConfigurator}
						style={{color: savePdf === false && paying === false ? "var(--color-accent)" : undefined}}>
						Configurator
					</button>
				</div>
				<div className="extra-btn">
					<button className="sva-btn"
						onClick={onHandleForm}
						style={{ color: savePdf === true && paying === false ? "var(--color-accent)" : undefined }}>
						Form
					</button>
				</div>
				<div className="extra-btn">
					<button className="sva-btn"
					onClick={onHandlePayment}
					style={{ color: paying === true && savePdf === false ? "var(--color-accent)" : undefined }}
					>	
						Payment
					</button>
				</div>
				{/* <div className="extra-btn">
					<button className="sva-btn"
					onClick={onHandleDarkMode}
					style={{ color: paying === true && savePdf === false ? "var(--color-accent)" : undefined }}
					>	
						{darkMode === false ? <LuMoonStar /> : <MdOutlineWbSunny style={{fontSize: "1.1em"}}/>}
					</button>
				</div> */}
			</div>
		</>
	);
}
