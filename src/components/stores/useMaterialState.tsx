import { createWithEqualityFn } from "zustand/traditional";


interface MaterialState {

	plankMaterialWoodLight: boolean;
	setPlankMaterialWoodLight: (newPlankMaterial: boolean) => void;

	plankMaterialWoodDark: boolean;
	setPlankMaterialWoodDark: (newPlankMaterial: boolean) => void;

	plankMaterialMetal: boolean;
	setPlankMaterialMetal: (newPlankMaterial: boolean) => void;
}

const useMaterialState = createWithEqualityFn<MaterialState>((set) => ({

	plankMaterialWoodLight: false,
	setPlankMaterialWoodLight: (newPlankMaterial: boolean) => set({ plankMaterialWoodLight: newPlankMaterial }),	

	plankMaterialWoodDark: false,
	setPlankMaterialWoodDark: (newPlankMaterial: boolean) => set({ plankMaterialWoodDark: newPlankMaterial }),

	plankMaterialMetal: false,
	setPlankMaterialMetal: (newPlankMaterial: boolean) => set({ plankMaterialMetal: newPlankMaterial }),
}));

export default useMaterialState;