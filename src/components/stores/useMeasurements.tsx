import { createWithEqualityFn } from "zustand/traditional";

interface MeasurementsState {
	frameLength: number;
	setFrameLength: (newFrameLength: number) => void;

	frameWidth: number;
	setFrameWidth: (newFrameWidth: number) => void;

	plankHeight: number;
	setPlankHeight: (newPlankHeight: number) => void;

	totalWeightRounded: number;
	setTotalWeightRounded: (newWeight: number) => void;

	totalPriceRounded: number;
	setTotalPriceRounded: (newPrice: number) => void;

	flashLight: number;
	setFlashLight: (newFlashLight: number) => void;
}

const useMeasurements = createWithEqualityFn<MeasurementsState>((set) => ({
	// FRAME LENGTH
	frameLength: 0,
	setFrameLength: (newFrameLength: number) => set({ frameLength: newFrameLength }),

	// FRAME WIDTH
	frameWidth: 0,
	setFrameWidth: (newFrameWidth: number) => set({ frameWidth: newFrameWidth }),

	// FRAME HEIGHT
	plankHeight: 0,
	setPlankHeight: (newPlankHeight: number) => set({ plankHeight: newPlankHeight }),

	// TOTAL WEIGHT
	totalWeightRounded: 0,
	setTotalWeightRounded: (newWeight: number) => set({ totalWeightRounded: newWeight }),

	// TOTAL PRICE
	totalPriceRounded: 0,
	setTotalPriceRounded: (newPrice: number) => set({ totalPriceRounded: newPrice }),

	flashLight: 0,
	setFlashLight: (newFlashLight: number) => set({ flashLight: newFlashLight }),
}));

export default useMeasurements;
