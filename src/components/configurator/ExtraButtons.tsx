import { useCallback } from "react";
import useButtonState from "../stores/useButtonState";
import { shallow } from "zustand/shallow";
import useMeasurements from "../stores/useMeasurements";
import useMaterialState from "../stores/useMaterialState";
import { LiaDiceSolid } from "react-icons/lia";
// import { LuMoonStar } from "react-icons/lu";
// import { MdOutlineWbSunny } from "react-icons/md";

export default function ExtraButtons() {
	const { setSavePdf, savePdf, paying, setPaying, setSaveFile, saveFile, /* darkMode, setDarkMode */ setJockeyWheel, setMeshSideState, setSpareWheel, setCanopy, setLoadingRamps, setGateOpen} = useButtonState(
		(state) => ({
			setSavePdf: state.setSavePdf,
			savePdf: state.savePdf,
			paying: state.paying,
			setPaying: state.setPaying,
			setJockeyWheel: state.setJockeyWheel,
			setMeshSideState: state.setMeshSideState,
			setSpareWheel: state.setSpareWheel,
			setCanopy: state.setCanopy,
			setLoadingRamps: state.setLoadingRamps,
			canopy: state.canopy,
			meshSideState: state.meshSideState,
			setGateOpen: state.setGateOpen,	
			loadingRamps: state.loadingRamps,
			spareWheel: state.spareWheel,
			setSaveFile: state.setSaveFile,
			saveFile: state.saveFile,
			// darkMode: state.darkMode,
			// setDarkMode: state.setDarkMode,
		}),
		shallow
	);

	const { setPlankMaterialWoodLight, setPlankMaterialWoodDark, setPlankMaterialMetal } = useMaterialState(
		(state) => ({
			setPlankMaterialWoodLight: state.setPlankMaterialWoodLight,
			setPlankMaterialWoodDark: state.setPlankMaterialWoodDark,
			setPlankMaterialMetal: state.setPlankMaterialMetal,
		}),
		shallow
	);
	

	const onHandleConfigurator = useCallback(() => {
		setSavePdf(false);
		setPaying(false);
		setSaveFile(false);
	}, [setSavePdf, setPaying, setSaveFile]);

	const onHandleForm = useCallback(() => {
		setSavePdf(true);
		setPaying(false);
		setSaveFile(false);
	}, [setSavePdf, setPaying, setSaveFile]);

	// const onHandlePayment = useCallback(() => {
	// 	setSavePdf(false);
	// 	setPaying(true);
	// }, [setSavePdf, setPaying]);

	
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

	const {setFrameLength, setFrameWidth, setPlankHeight } = useMeasurements(
		(state) => ({
			setFrameLength: state.setFrameLength,
			setFrameWidth: state.setFrameWidth,
			setPlankHeight: state.setPlankHeight,
		}),
		shallow
	);

	let isClicked = false;
	const onHandleDice = useCallback(() => {
		isClicked = true;
		setFrameLength(Math.random() * (5 - 2.3) + 2.3);
		setFrameWidth(Math.random() * (2.2 - 1) + 1);
		setPlankHeight(Math.random() * (0.45 - 0.001) + 0.001);
	
		const newLoadingRamps = Math.random() > 0.5;
		setLoadingRamps(newLoadingRamps);
		
		if (newLoadingRamps) {
			setGateOpen(true);
		} else {
			setGateOpen(false);
		}
	
		setSpareWheel(Math.random() > 0.5);
		setJockeyWheel(Math.random() > 0.5);
	
		const accessoryIndex = Math.floor(Math.random() * 2);
		setCanopy(accessoryIndex === 0);
		setMeshSideState(accessoryIndex === 1);
	
		const materialIndex = Math.floor(Math.random() * 3);
		setPlankMaterialWoodLight(materialIndex === 0);
		setPlankMaterialWoodDark(materialIndex === 1);
		setPlankMaterialMetal(materialIndex === 2);

		setTimeout(() => {
			if (isClicked) {
				isClicked = false;
			}
		}, 500);
	
	}, [setFrameLength, setFrameWidth, setPlankHeight]);



	const onHandleSave = useCallback(() => {
		setSaveFile(true);
		setSavePdf(false);
		setPaying(false);
	}, [setSavePdf, setPaying, setSaveFile]);


	return (
		<>
			<div className="extra-buttons-container" style={{display: innerWidth > 950 ? 'flex' : 'none'}}>
			<div className="extra-btn">
					<button
						className="sva-btn"
						onClick={onHandleDice}
						style={{
							fontSize: "1.6em",
							marginRight: "-16px",
							color: isClicked ? "var(--color-accent)" : undefined}}>
						<LiaDiceSolid />
					</button>
				</div>
				<div className="extra-btn">
					<button
						className="sva-btn"
						onClick={onHandleConfigurator}
						style={{color: savePdf === false && paying === false && saveFile === false ? "var(--color-accent)" : undefined}}>
						Configurator
					</button>
				</div>
				<div className="extra-btn">
					<button className="sva-btn"
						onClick={onHandleForm}
						style={{ color: savePdf === true && paying === false && saveFile === false ? "var(--color-accent)" : undefined }}>
						Form
					</button>
				</div>
				{/* <div className="extra-btn">
					<button className="sva-btn"
					onClick={onHandlePayment}
					style={{ color: paying === true && savePdf === false ? "var(--color-accent)" : undefined }}
					>	
						Payment
					</button>
				</div> */}
				<div className="extra-btn">
					<button className="sva-btn"
						onClick={onHandleSave}
						style={{
							color: savePdf === false && paying === false && saveFile === true ? "var(--color-accent)" : undefined}}>	
						File
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
