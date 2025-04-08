import useMeasurements from "../stores/useMeasurements";
import Slider from "./Slider";
import { shallow } from "zustand/shallow";
import { RiResetLeftFill } from "react-icons/ri";
// import useButtonState from "../stores/useButtonState";
import { useEffect } from "react";
export default function MeasurementsConfig() {
	const { frameLength, setFrameLength, frameWidth, setFrameWidth, plankHeight, setPlankHeight } = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			setFrameLength: state.setFrameLength,
			frameWidth: state.frameWidth,
			setFrameWidth: state.setFrameWidth,
			plankHeight: state.plankHeight,
			setPlankHeight: state.setPlankHeight,
		}),
		shallow
	);
	// const { setJockeyWheel, setMeshSideState, setSpareWheel } = useButtonState((state) => ({
	// 	setJockeyWheel: state.setJockeyWheel,
	// 	setMeshSideState: state.setMeshSideState,
	// 	setSpareWheel: state.setSpareWheel,
	// }));

	useEffect(() => {
		// Haal de parameters uit de URL

		const params = new URLSearchParams(window.location.search);
	
		const urlFrameLength = parseFloat(params.get('length') || '');
		const urlFrameWidth = parseFloat(params.get('width') || '');
		const urlPlankHeight = parseFloat(params.get('height') || '');
	
		// Als de parameters aanwezig zijn in de URL, update ze in de store
		if (!isNaN(urlFrameLength)) {setFrameLength(urlFrameLength)} else if (isNaN(urlFrameLength)) {setFrameLength(2.3)};
		if (!isNaN(urlFrameWidth)) {setFrameWidth(urlFrameWidth)} else if (isNaN(urlFrameWidth)) {setFrameWidth(1.5)};
		if (!isNaN(urlPlankHeight)) {setPlankHeight(urlPlankHeight)} else if (isNaN(urlPlankHeight)) {setPlankHeight(0.3)};
	}, [setFrameLength, setFrameWidth, setPlankHeight]);

	  // reload page
	  const handleReset = () => {
		window.location.reload();
	};

	return (
		<>
			<div className="section-container">
				<h3>
					Trailerbed size{" "}
					<button className="reset-btn" onClick={handleReset}>
						<RiResetLeftFill />
					</button>
				</h3>
				<div className="measurement">
					<div className="slider-title">Length</div>
					<Slider value={frameLength != 0 ? frameLength : 2.3} min={1} max={5} onChange={setFrameLength} />
				</div>
				<div className="measurement">
					<div className="slider-title">Width</div>
					<Slider value={frameWidth != 0 ? frameWidth : 1.5} min={1} max={2.2} onChange={setFrameWidth} />
				</div>
				<div className="measurement">
					<div className="slider-title">Height</div>
					<Slider value={plankHeight != 0 ? plankHeight : 0.3} min={0.001} max={0.45} onChange={setPlankHeight} />
				</div>
			</div>
		</>
	);
}