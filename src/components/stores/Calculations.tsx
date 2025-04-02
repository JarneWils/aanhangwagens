import useMeasurements from "./useMeasurements";
import useButtonState from "./useButtonState";
import "../../style.css";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import useMaterialState from "./useMaterialState";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineScale } from "react-icons/md";
import ExtraButtons from "../configurator/ExtraButtons";

export default function Calculations() {
	/*
	 * Imports
	 */
	//-----------------------------------------------------------------------------
	const { plankMaterialMetal, plankMaterialWoodLight, plankMaterialWoodDark } = useMaterialState(
		(state) => ({
			plankMaterialMetal: state.plankMaterialMetal,
			plankMaterialWoodLight: state.plankMaterialWoodLight,
			plankMaterialWoodDark: state.plankMaterialWoodDark,
		}),
		shallow
	);
	const { canopy, loadingRamps } = useButtonState(
		(state) => ({
			canopy: state.canopy,
			loadingRamps: state.loadingRamps,
		}),
		shallow
	);

	// wheights
	const woodWeight = plankMaterialWoodLight ? 9 : plankMaterialWoodDark ? 10 : plankMaterialMetal ? 15 : 0; // kg/m²
	const metalWeight = 15.7; // kg/m²
	let axleWeight = 80; // kg
	const koppelstukWeight = 7; // kg
	const noseWheelWeight = 6; // kg
	let jockeyWheelWeight = 6; // kg
	let spareWheelWeight = 15; //kg
	const canopyWeight = 8.33 + 0.6 + 20; //kg/m² van de laadbak
	let loadingRampsWeight = 8; //kg/m² van de laadbak

	// prices
	const woodPrice = plankMaterialWoodLight ? 10 : plankMaterialWoodDark ? 6.81 : plankMaterialMetal ? 35 : 0; // €/m²
	const metalPrice = 35; // €/m²
	let axlePrice = 300; // €
	const koppelstukPrice = 75; // €
	const noseWheelPrice = 60; // €
	let jockeyWheelPrice = 22; // €
	let spareWheelPrice = 82; //€
	let canopyPrice = 150; //€
	let loadingRampsPrice = 25; //€

	// measurements
	const { frameLength, frameWidth, plankHeight, setTotalWeightRounded, setTotalPriceRounded } = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			frameWidth: state.frameWidth,
			plankHeight: state.plankHeight,
			setTotalWeightRounded: state.setTotalWeightRounded,
			setTotalPriceRounded: state.setTotalPriceRounded,
		}),
		shallow
	);

	//buttonstate
	const { meshSideState, jockeyWheel, spareWheel } = useButtonState(
		(state) => ({
			meshSideState: state.meshSideState,
			jockeyWheel: state.jockeyWheel,
			spareWheel: state.spareWheel,
		}),
		shallow
	);

	/*
	 * AREA CALCULATIONS
	 */
	//------------------------------------------------------------------------------

	// bottom plank
	const areaBottomPlank = (frameLength - 0.04) * (frameWidth + 0.04);
	const bottomPlankWeight = areaBottomPlank * woodWeight;

	// Left + Right plank
	const areaSidePlank = (frameLength - 0.01) * plankHeight;
	const sidePlankWeight = areaSidePlank * woodWeight * 2;

	// Front + Back plank
	const areaWidthPlank = (frameWidth + 0.04) * plankHeight;
	const widthPlankWeight = areaWidthPlank * woodWeight * 2;

	// Axle count
	if (frameLength <= 3) {
		axleWeight = 80;
	} else {
		axleWeight = axleWeight * 2;
	}
	const axleWeightTotal = axleWeight;

	// Bottom Frame L+R Bar
	const areaBottomSideBar = 0.05 * 4 * frameLength;
	const bottomSideBarWeight = areaBottomSideBar * metalWeight * 2;

	// HORIZONTAL Bottom Bars Middle
	let middleBarCount = 3;
	if (frameLength == 1) {
		middleBarCount = 3;
	}
	if (frameLength > 1) {
		middleBarCount = 4;
	}
	if (frameLength > 1.5) {
		middleBarCount = 5;
	}
	if (frameLength > 2) {
		middleBarCount = 6;
	}
	if (frameLength > 2.5) {
		middleBarCount = 7;
	}
	if (frameLength > 3) {
		middleBarCount = 8;
	}
	if (frameLength > 3.5) {
		middleBarCount = 9;
	}
	if (frameLength > 4) {
		middleBarCount = 10;
	}
	if (frameLength > 4.5) {
		middleBarCount = 11;
	}
	if (frameLength > 5) {
		middleBarCount = 12;
	}
	const areaBottomMiddleBar = 0.05 * 4 * frameWidth * middleBarCount + 0.05 * 4 * frameWidth * 3;
	const bottomMiddleBarsWeight = areaBottomMiddleBar * metalWeight;

	// VERTICAL TOP Bars Middle
	const areaTopBarsMiddle = 0.02 * 4 * (plankHeight + 0.1) * middleBarCount * 2;
	const topBarsCornerWeight = 0.05 * 4 * (plankHeight + 0.1);
	const topBarsMiddleBarsWeight = areaTopBarsMiddle * metalWeight + topBarsCornerWeight;

	// TrailerBed Side Bars Horizontal
	const areaTopSideBar = (0.4 * 2 + 0.2 * 2) * frameLength * 2;
	const topSideBarWeight = areaTopSideBar * metalWeight;

	// Trailer Nose Frame
	const areaTrailerNoseFrame = (0.05 * 2 + 0.5 * 2) * 1.4 * 3;
	const trailerNoseFrameWeight = areaTrailerNoseFrame * metalWeight;

	//Mesh Sides
	let meshSidesWeight = 0;
	const areaMeshSides = (0.14 * (frameLength - 0.01) + 0.14 * (plankHeight + 0.01)) * 2;
	if (meshSideState === true) {
		meshSidesWeight = areaMeshSides * metalWeight;
	} else meshSidesWeight = 0;

	//Jockey Wheel
	if (jockeyWheel === true) {
		jockeyWheelWeight = 6;
	} else {
		jockeyWheelWeight = 0;
	}

	//Spare Wheel
	if (spareWheel === true) {
		spareWheelWeight = 15;
	} else {
		spareWheelWeight = 0;
	}

	//Loading Ramps
	if (loadingRamps === true) {
		loadingRampsWeight = 8;
	} else {
		loadingRampsWeight = 0;
	}

	//Canopy
	const canopyArea = (frameLength) * (frameWidth);
	const totalCanopyWeight = canopy ? canopyArea * canopyWeight : 0;

	//TOTAL WEIGHT
	const totalWeight =
		axleWeightTotal +
		bottomPlankWeight +
		sidePlankWeight +
		widthPlankWeight +
		bottomSideBarWeight +
		bottomMiddleBarsWeight +
		topSideBarWeight +
		topBarsMiddleBarsWeight +
		koppelstukWeight +
		noseWheelWeight +
		trailerNoseFrameWeight +
		meshSidesWeight +
		jockeyWheelWeight +
		spareWheelWeight+
		totalCanopyWeight+
		loadingRampsWeight;

	const totalWeightRounded = parseFloat(totalWeight.toFixed(2));

	useEffect(() => {
		setTotalWeightRounded(totalWeightRounded);
	}, [totalWeightRounded, setTotalWeightRounded]);

	/*
	 * PRICE CALCULATIONS
	 */
	//------------------------------------------------------------------------------

	//WOOD
	const totalWoodArea = areaBottomPlank + areaSidePlank + areaWidthPlank;
	const totalWoodPrice = totalWoodArea * woodPrice;

	//METAL
	const totalMetalArea =
		areaBottomSideBar +
		areaBottomMiddleBar +
		areaTopBarsMiddle +
		areaTopSideBar +
		areaTrailerNoseFrame +
		meshSidesWeight / metalWeight;
	const totalMetalPrice = totalMetalArea * metalPrice;

	//AXLES
	if (frameLength <= 3) {
		axlePrice = 300;
	} else {
		axlePrice = 600;
	}

	//Jockey Wheel
	if (jockeyWheel === true) {
		jockeyWheelPrice = 22;
	} else {
		jockeyWheelPrice = 0;
	}

	//Spare Wheel
	if (spareWheel === true) {
		spareWheelPrice = 82;
	} else {
		spareWheelPrice = 0;
	}

	//Canopy price
	
	if (canopy === true) {
		canopyPrice = canopyPrice;
	} else {
		canopyPrice = 0;
	}

	//Loading Ramps price
	if (loadingRamps === true) {
		loadingRampsPrice = loadingRampsPrice;
	} else {
		loadingRampsPrice = 0;
	}

	//TOTAL PRICE
	let totalPriceRounded = parseFloat(
		(
			totalWoodPrice +
			totalMetalPrice +
			axlePrice +
			koppelstukPrice +
			noseWheelPrice +
			jockeyWheelPrice +
			spareWheelPrice +
			canopyPrice +
			loadingRampsPrice
		).toFixed(2)
	);

	useEffect(() => {
		setTotalPriceRounded(totalPriceRounded);
	}, [totalPriceRounded, setTotalPriceRounded]);

	/*
	 * JSX en CSS
	 */
	//------------------------------------------------------------------------------

	return (
		<>
			<div className="calculation-container">
				{/* Extra Buttons */}
				{innerWidth < 900 ? <ExtraButtons /> : null}
				<div>
					{totalWeightRounded > 750 ? (
						<div className="alert">
							<p className="alert-text">BE driverslicense required.</p>
						</div>
					) : null}
				</div>
				<div className="calculation-numbers">
					<div className="weight" style={{ color: totalWeightRounded > 750 ? "rgb(255, 50, 50)" : "var(--color-dark-text)" }}>
						<MdOutlineScale className="weight-icon" /> {totalWeightRounded} kg
					</div>
					<div className="price"> <IoPricetagsOutline className="price-icon" /> € {totalPriceRounded}</div>
				</div>
			</div>
		</>
	);
}
