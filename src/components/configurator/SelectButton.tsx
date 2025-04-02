import { shallow } from "zustand/shallow";
import useButtonState from "../stores/useButtonState";
import { useCallback, useEffect } from "react";

export default function SelectButton({ name }: { name: string }) {
	const { meshSideState, jockeyWheel, setMeshSideState, setJockeyWheel, spareWheel, setSpareWheel, canopy, setCanopy, loadingRamps, setLoadingRamps, setGateOpen, gateOpen } = useButtonState(
		(state) => ({
			meshSideState: state.meshSideState,
			jockeyWheel: state.jockeyWheel,
			setMeshSideState: state.setMeshSideState,
			setJockeyWheel: state.setJockeyWheel,
			spareWheel: state.spareWheel,
			setSpareWheel: state.setSpareWheel,
			canopy: state.canopy,
			setCanopy: state.setCanopy,
			loadingRamps: state.loadingRamps,
			setLoadingRamps: state.setLoadingRamps,
			setGateOpen: state.setGateOpen,
			gateOpen: state.gateOpen,
		}),
		shallow
	);

	const handleClick = useCallback(() => {
		if (name === "Mesh Sides") {
			setMeshSideState(!meshSideState);
			setCanopy(false);
		} else if (name === "Jockey Wheel") {
			setJockeyWheel(!jockeyWheel);
		} else if (name === "Spare Wheel") {
			setSpareWheel(!spareWheel);
		} else if (name === "Canopy") {
			setCanopy(!canopy);
			setMeshSideState(false);
		} else if (name === "Loading Ramps" && gateOpen === false) {
			setLoadingRamps(true);
			setGateOpen(true);
		} else if (name === "Loading Ramps" && gateOpen === true && loadingRamps === false) {
			setLoadingRamps(true);
			setGateOpen(true);
		} else if (name === "Loading Ramps" && gateOpen === true && loadingRamps === true) {
			setLoadingRamps(false);
			setGateOpen(false);
		}
	}, [jockeyWheel, meshSideState, name, setJockeyWheel, setMeshSideState, setSpareWheel, spareWheel, canopy, setCanopy, loadingRamps, setLoadingRamps, gateOpen, setGateOpen]);

	let buttonStyle;
	if (name === "Mesh Sides") {
		if (meshSideState) {
			buttonStyle = { backgroundColor: "var(--color-accent)", color: "#FFFFFF" };
		} else {
			buttonStyle = undefined;
		}
	} else if (name === "Jockey Wheel") {
		if (jockeyWheel) {
			buttonStyle = { backgroundColor: "var(--color-accent)", color: "#FFFFFF" };
		} else {
			buttonStyle = undefined;
		}
	} else if (name === "Spare Wheel") {
		if (spareWheel) {
			buttonStyle = { backgroundColor: "var(--color-accent)", color: "#FFFFFF" };
		} else {
			buttonStyle = undefined;
		}
	} else if (name === "Canopy") {
		if (canopy) {
			buttonStyle = { backgroundColor: "var(--color-accent)", color: "#FFFFFF" };
		} else {
			buttonStyle = undefined;
		}
	} else if (name === "Loading Ramps") {
		if (loadingRamps) {
			buttonStyle = { backgroundColor: "var(--color-accent)", color: "#FFFFFF" };
		} else {
			buttonStyle = undefined;
		}
	}

	useEffect(() => {
		// Haal de parameters uit de URL
		const params = new URLSearchParams(window.location.search);
	
		const urlJockeyWheel = params.get('jockey_wheel') || '';
		const urlMeshSides = params.get('mesh_sides') || '';
		const urlSpareWheel = params.get('spare_wheel') || '';
		const urlCanopy = params.get('canopy') || '';
		const urlLoadingRamps = params.get('loading_ramps') || '';

		// Als de parameters aanwezig zijn in de URL, update ze in de store
		if (urlJockeyWheel === '1') setJockeyWheel(true);
		if (urlMeshSides === '1') setMeshSideState(true);
		if (urlSpareWheel === '1') setSpareWheel(true);
		if (urlCanopy === '1') setCanopy(true);
		if (urlLoadingRamps === '1') {
			setLoadingRamps(true)
			setGateOpen(true)
		};
	  	}, [setJockeyWheel, setMeshSideState, setSpareWheel, setCanopy, setLoadingRamps, setGateOpen]);

	return (
		<button style={{ ...buttonStyle, padding: "7px" }} onClick={handleClick} className="selectButton">
			{name}
		</button>
	);
}