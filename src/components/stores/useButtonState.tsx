import { createWithEqualityFn } from "zustand/traditional";

interface ButtonState {
	meshSideState: boolean;
	setMeshSideState: (newState: boolean) => void;

	jockeyWheel: boolean;
	setJockeyWheel: (newState: boolean) => void;

	spareWheel: boolean;
	setSpareWheel: (newState: boolean) => void;

	canopy: boolean;
	setCanopy: (newState: boolean) => void;

	loadingRamps: boolean;
	setLoadingRamps: (newState: boolean) => void;

	gateOpen: boolean;
	setGateOpen: (newState: boolean) => void;

	fullScreen: boolean;
	setFullScreen: (newState: boolean) => void;

	cameraCenter: boolean;
	setCameraCenter: (newState: boolean) => void;

	savePdf: boolean;
	setSavePdf: (newSavePdf: boolean) => void;

	paying: boolean;
	setPaying: (newPaying: boolean) => void;
}

const useButtonState = createWithEqualityFn<ButtonState>((set) => ({
	meshSideState: false,
	setMeshSideState: (newState) => set({ meshSideState: newState }),

	jockeyWheel: true,
	setJockeyWheel: (newState) => set({ jockeyWheel: newState }),

	spareWheel: false,
	setSpareWheel: (newState) => set({ spareWheel: newState }),
	
	canopy: false,
	setCanopy: (newState) => set({ canopy: newState }),

	loadingRamps: false,
	setLoadingRamps: (newState) => set({ loadingRamps: newState }),

	gateOpen: false,
	setGateOpen: (newState) => set({ gateOpen: newState }),

	fullScreen: false,
	setFullScreen: (newState) => set({ fullScreen: newState }),

	cameraCenter: false,
	setCameraCenter: (newState) => set({ cameraCenter: newState }),

	savePdf: false,
	setSavePdf: (newSavePdf) => set({ savePdf: newSavePdf }),

	paying: false,
	setPaying: (newPaying) => set({ paying: newPaying }),
}));

export default useButtonState;
