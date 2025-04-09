import { shallow } from "zustand/shallow";
import useButtonState from "../stores/useButtonState";
import { useCallback, useEffect } from "react";
import { toast } from "sonner"


export default function SelectButton({ name }: { name: string }) {
	const { meshSideState, jockeyWheel, setMeshSideState, setJockeyWheel, spareWheel, setSpareWheel, canopy, setCanopy, loadingRamps, setLoadingRamps, setGateOpen, gateOpen, darkMode } = useButtonState(
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
			darkMode: state.darkMode,
		}),
		shallow
	);
	
	const root = document.getElementById("root");
	function isGreen(){
		if(root && darkMode === false){
			root.style.setProperty('--color-popup', '#198754');
			// root.style.setProperty('--color-popup-background', '#cff4e2');
		} else if (root && darkMode === true){
			root.style.setProperty('--color-popup', '#3EF19E');
		}
	}
	function isRed(){
		if(root && darkMode === false){
			root.style.setProperty('--color-popup', '#dc3545');
			// root.style.setProperty('--color-popup-background', '#f8d7da');
		} else if (root && darkMode === true){
			root.style.setProperty('--color-popup', '#F43838');
		}
	}

	const handleClick = useCallback(() => {

		if (name === "Mesh Sides" && meshSideState === false && root) {
			setMeshSideState(true);
			setCanopy(false);
			toast.success(" + €200,00 : Mesh sides added");
			isGreen();
		} else if (name === "Mesh Sides" && meshSideState === true && root) {
			setMeshSideState(false);
			toast.success(" - €200,00 : Mesh sides removed");
			isRed();
		}

		if (name === "Jockey Wheel" && jockeyWheel === false) {
			setJockeyWheel(true);
			toast.success(" + €60,00 : Jockey wheel added");
			isGreen();
		} else if (name === "Jockey Wheel" && jockeyWheel === true) {
			setJockeyWheel(false);
			toast.success(" - €60,00 : Jockey wheel removed");
			isRed();
		}

		if (name === "Spare Wheel" && spareWheel === false) {
			setSpareWheel(true);
			toast.success(" + €82,00 : Spare wheel added");
			isGreen();
		} else if (name === "Spare Wheel" && spareWheel === true) {
			setSpareWheel(false);
			toast.success(" - €82,00 : Spare wheel removed");
			isRed();
		}

		if (name === "Canopy" && canopy === false) {
			setCanopy(true);
			setMeshSideState(false);
			toast.success(" + €500,00 : Canopy added");
			isGreen();
		} else if (name === "Canopy" && canopy === true) {
			setCanopy(false);
			toast.success(" - €500,00 : Canopy removed");
			isRed();
		}

		if (name === "Loading Ramps" && gateOpen === false) {
			setLoadingRamps(true);
			setGateOpen(true);
			toast.success(" + €40,00 : Loading ramps added");
			isGreen();
		} else if (name === "Loading Ramps" && gateOpen === true && loadingRamps === false) {
			setLoadingRamps(true);
			setGateOpen(true);
			toast.success(" + €40,00 : Loading ramps added");
			isGreen();
		} else if (name === "Loading Ramps" && gateOpen === true && loadingRamps === true) {
			setLoadingRamps(false);
			setGateOpen(false);
			toast.success(" - €40,00 : Loading ramps removed");
			isRed();
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