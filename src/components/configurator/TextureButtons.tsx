import { useCallback, useEffect } from "react";
import useMaterialState from "../stores/useMaterialState";
import { shallow } from "zustand/shallow";
import { baseUrl } from "../../global";


export default function TextureButtons({ name }: { name: string }) {

	// import material state
	const { plankMaterialWoodLight, plankMaterialWoodDark, plankMaterialMetal, setPlankMaterialWoodLight, setPlankMaterialWoodDark, setPlankMaterialMetal } = useMaterialState(
		(state) => ({
			plankMaterialWoodLight: state.plankMaterialWoodLight,
			plankMaterialWoodDark: state.plankMaterialWoodDark,
			plankMaterialMetal: state.plankMaterialMetal,
			setPlankMaterialWoodLight: state.setPlankMaterialWoodLight,
			setPlankMaterialWoodDark: state.setPlankMaterialWoodDark,
			setPlankMaterialMetal: state.setPlankMaterialMetal,
		}),
		shallow
	);

	let textureImagePath;

	if (name === "Wood Light") {
		textureImagePath = `${baseUrl}/img/woodLight.png`;
	} else if (name === "Wood Dark") {
		textureImagePath = `${baseUrl}/img/woodDark.png`;
	} else if (name === "Metal") {
		textureImagePath = `${baseUrl}/img/metal.png`;
	}

	//data from url if no data is provided, set plankMaterialWoodLight to true
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const urlWoodLight = params.get('wood_light') || '';
		const urlWoodDark = params.get('wood_dark') || '';
		const urlMetal = params.get('metal') || '';

		if (!window.location.search) {
			setPlankMaterialWoodLight(true);
		} else {
			if (urlWoodLight === '1'){setPlankMaterialWoodLight(true)} else {setPlankMaterialWoodLight(false)};
			if (urlWoodDark === '1'){setPlankMaterialWoodDark(true)} else {setPlankMaterialWoodDark(false)};
			if (urlMetal === '1'){setPlankMaterialMetal(true)} else {setPlankMaterialMetal(false)};
		}
	}, [setPlankMaterialWoodLight, setPlankMaterialWoodDark, setPlankMaterialMetal]);


	// change material state on click
	const handleClick = useCallback(() => {
		if (name === "Wood Light") {
			if (!plankMaterialWoodDark && !plankMaterialMetal && plankMaterialWoodLight) return;
			setPlankMaterialWoodLight(true);
			setPlankMaterialWoodDark(false);
			setPlankMaterialMetal(false);
		} else if (name === "Wood Dark") {
			if (!plankMaterialWoodLight && !plankMaterialMetal && plankMaterialWoodDark) return;
			setPlankMaterialWoodLight(false);
			setPlankMaterialWoodDark(true);
			setPlankMaterialMetal(false);
		} else if (name === "Metal") {
			if (!plankMaterialWoodLight && !plankMaterialWoodDark && plankMaterialMetal) return;
			setPlankMaterialWoodLight(false);
			setPlankMaterialWoodDark(false);
			setPlankMaterialMetal(true);
		}
	}, [name, plankMaterialWoodLight, plankMaterialWoodDark, plankMaterialMetal, setPlankMaterialWoodLight, setPlankMaterialWoodDark, setPlankMaterialMetal]);
	

	let buttonStyle;
	if (name === "Wood Light") {
		if (plankMaterialWoodLight) {
			buttonStyle = { border: "3px solid var(--color-accent)" };
		} else {
			buttonStyle = { border: "3px solid var(--color-white)" };
		}
	} else if (name === "Wood Dark") {
		if (plankMaterialWoodDark) {
			buttonStyle = { border: "3px solid var(--color-accent)" };
		} else {
			buttonStyle = { border: "3px solid var(--color-white)" };
		}
	} else if (name === "Metal") {
		if (plankMaterialMetal) {
			buttonStyle = { border: "3px solid var(--color-accent)" };
		} else {
			buttonStyle = { border: "3px solid var(--color-white)" };
		}
	}



	return(
		<button style={{...buttonStyle, padding: "0px" }} onClick={handleClick} className="selectButtonTexture">
			<img style={{width: "64px", height: "64px"}} src={textureImagePath}/>
		</button>
	)
}

