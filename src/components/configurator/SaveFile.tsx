import { shallow } from "zustand/shallow";
import { useCallback, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import useButtonState from "../stores/useButtonState";
import useMeasurements from "../stores/useMeasurements";

export default function SaveFile() {
	
	const { setSavePdf, setPaying, setSaveFile, saveFile } = useButtonState(
		(state) => ({
			savePdf: state.savePdf,
			setSavePdf: state.setSavePdf,
			setPaying: state.setPaying,
			setSaveFile: state.setSaveFile,
			saveFile: state.saveFile,
		}),
		shallow
	);

	const { frameLength, frameWidth, plankHeight, setFrameLength, setFrameWidth, setPlankHeight } = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			frameWidth: state.frameWidth,
			plankHeight: state.plankHeight,
			setFrameLength: state.setFrameLength,
			setFrameWidth: state.setFrameWidth,
			setPlankHeight: state.setPlankHeight,
		}),
		shallow
	);

	const { jockeyWheel, spareWheel, canopy, meshSideState, loadingRamps, setJockeyWheel, setSpareWheel, setCanopy, setMeshSideState, setLoadingRamps } = useButtonState(
		(state) => ({
			jockeyWheel: state.jockeyWheel,
			spareWheel: state.spareWheel,
			canopy: state.canopy,
			meshSideState: state.meshSideState,
			loadingRamps: state.loadingRamps,
			setJockeyWheel: state.setJockeyWheel,
			setSpareWheel: state.setSpareWheel,
			setCanopy: state.setCanopy,
			setMeshSideState: state.setMeshSideState,
			setLoadingRamps: state.setLoadingRamps,
		}),
		shallow
	)
	

	const [formIsVisible, setFormIsVisible] = useState(true);


	// submit handler
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setSavePdf(false);
		setFormIsVisible(true);
		setPaying(false);
	};

	// close button
	const handleCloseForm = useCallback(() => {
		setSavePdf(false);
		setFormIsVisible(true);
		setSaveFile(false);
	}, [setSavePdf]);

	const [fileName, setFileName] = useState("");


	const onHandleSave = useCallback(() => {
		setSaveFile(false);
		setSavePdf(false);
		setPaying(false);
		const configSettings = {
			length: frameLength,
			width: frameWidth,
			height: plankHeight,
			jockeyWheel: jockeyWheel,
			spareWheel: spareWheel,
			canopy: canopy,
			meshSide: meshSideState,
			loadingRamps: loadingRamps,
		};

		const blob = new Blob([JSON.stringify(configSettings)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		a.click();
	}, [frameLength, frameWidth, plankHeight, jockeyWheel, spareWheel, canopy, meshSideState, loadingRamps, fileName]);

	const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
	
		const text = await file.text();
		const configSettings = JSON.parse(text);
	
		// Elk veld apart instellen
		setFrameLength(configSettings.length);
		setFrameWidth(configSettings.width);
		setPlankHeight(configSettings.height);
		setJockeyWheel(configSettings.jockeyWheel);
		setSpareWheel(configSettings.spareWheel);
		setCanopy(configSettings.canopy);
		setMeshSideState(configSettings.meshSide);
		setLoadingRamps(configSettings.loadingRamps);
		setSaveFile(false);
		setSavePdf(false);
		setPaying(false);
	};

	return (
		<>
			<div className="form-visible" style={saveFile === true ? { display: "block" } : { display: "none" }}>
				<div className="form-blur-bg">
					<form onSubmit={handleSubmit}>
						<div className="form-container" style={formIsVisible === true ? { display: "block" } : { display: "none" }}>
							{/* CLOSE BUTTON */}
							<button type="button" className="form-close-btn" onClick={handleCloseForm}>
								<IoMdCloseCircle />
							</button>

							{/* Filename */}
							<div className="input-container">
								<div className="form-div">File name:</div>
								<input
									type="text"
									name="naam"
									className="form-input"
									value={fileName}
									onChange={(e) => setFileName(e.target.value)}
									style={{width: "256px"}}
								/>
							</div>

							<input
								type="file"
								accept=".json"
								onChange={handleFile}
								id="file"  // Zorg ervoor dat dit id hier staat
								style={{ display: "none", marginRight: "16px", cursor: "pointer" }}
							/>
							<label htmlFor="file" className="file-import-btn">
								Import file
							</label>

							<button className="form-submit-btn" onClick={onHandleSave}>
								Save file
							</button>

						</div>
					</form>
				</div>
			</div>
		</>
	);
}
