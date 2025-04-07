import "../../style.css";
import useButtonState from "../stores/useButtonState";
import { GoScreenFull } from "react-icons/go";
import { PiCompassLight } from "react-icons/pi";
import SelectButton from "./SelectButton";
import MeasurementsConfig from "./MeasurementsConfig";
import CalculationConfig from "./CalculationsConfig";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ExtraButtons from "./ExtraButtons";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";

// import Export from "./pdf/Export";
import Form from "./Form";
import TextureButtons from "./TextureButtons";
import OrderSection from "./OrderSection";
import useMeasurements from "../stores/useMeasurements";
import Payment from "./Payment";

export default function Configurator() {
	// FULL SCREEN
	const { fullScreen, setFullScreen,} = useButtonState((state) => ({
		fullScreen: state.fullScreen,
		setFullScreen: state.setFullScreen
		}),
		shallow
	);

	const {totalPriceRounded, totalWeightRounded} = useMeasurements(
		(state) => ({
			totalPriceRounded: state.totalPriceRounded,
			totalWeightRounded: state.totalWeightRounded,
		}),
		shallow
	)

	const handleClickFullScreen = useCallback(() => {
		setFullScreen(!fullScreen);
	}, [setFullScreen, fullScreen]);

	// CAMERA CENTER
	const setCameraCenter = useButtonState((state) => state.setCameraCenter);
	const handleClickCamera = () => {
		setCameraCenter(true);
		setTimeout(() => {
			setCameraCenter(false);
		}, 500);
	};

	const [step, setStep] = useState(1);

	return (
		<>
		<div className="gredient-right"></div>
			<Form />
			<Payment />

			{/* <Export /> */}
			<div className="scrollable-content">
				<div className="wp-back-btn">
					<a className="back-btn" href="http://localhost:3000">
						<IoMdArrowRoundBack className="back-btn-icon" />
					</a>
				</div>
				<div className="header">
					<div className="header-title">Create your trailer</div>
					<div className="header-subtitle">Trailer Configurator</div>
				</div>
				<div>
					<button className="fullScreenButton" onClick={handleClickFullScreen}>
						<div className="fullScreenButton-icon">
							<GoScreenFull />
						</div>
					</button>
					<button className="centerButton" onClick={handleClickCamera}>
						<div className="centerButton-icon">
							<PiCompassLight />
						</div>
					</button>
				</div>

				<div className="configurator">

					{/* CONFIG NAV */}
					<div className="config-nav" style={{display: innerWidth < 900 ? 'flex' : 'none'}}>
						{/* <div>Steps:</div> */}
						<button onClick={() => setStep(1)} className={step === 1 ? "active" : ""}>1</button>
						<button onClick={() => setStep(2)} className={step === 2 ? "active" : ""}>2</button>
						<button onClick={() => setStep(3)} className={step === 3 ? "active" : ""}>3</button>
						<div style={{marginRight: "3vw", marginLeft: "3vw", color: "var(--color-light-text)", fontSize: "0.9em"}}>€ {totalPriceRounded}</div>
						<div style={{marginLeft: "3vw", color: "var(--color-light-text)",fontSize: "0.9em"}}>{totalWeightRounded} kg</div>
					</div>

					<ScrollArea.Root className="scroll-area">
						<ScrollArea.Viewport className="scroll-viewport">

							{/* CONFIG NAV */}
							<div className="config-nav" style={{display: innerWidth > 900 ? 'flex' : 'none'}}>
								{/* <div>Steps:</div> */}
								<button onClick={() => setStep(1)} className={step === 1 ? "active" : ""}>1</button>
								<button onClick={() => setStep(2)} className={step === 2 ? "active" : ""}>2</button>
								<button onClick={() => setStep(3)} className={step === 3 ? "active" : ""}>3</button>
							</div>

							
							<>
							{/* STEP 1 */}
							<div style={{ display: step === 1 ? 'block' : 'none' }}>
								{/* MEASUREMENTS */}
								<MeasurementsConfig />
								{/* CALCULATIONS */}
								<CalculationConfig />

							</div>

							{/* STEP 2 */}
							<div style={{ display: step === 2 ? 'block' : 'none' }}>
								{/* ACCESSOIRES */}
								<div className="section-container">
									<h3>Accessoires</h3>
									<div className="button-container">
										<div className="acc-button">
											<div>
												<SelectButton name="Jockey Wheel" />
											</div>
											<div>
												<SelectButton name="Mesh Sides" />
											</div>
											<div>
												<SelectButton name="Spare Wheel" />
											</div>
										</div>
										<div className="acc-button" style={{ marginTop: "32px", marginBottom: "-24px", height: "32px" }}>
												<SelectButton name="Canopy" /> <SelectButton name="Loading Ramps" />
										</div>
									</div>
								</div>
								{/* TEXTURES */}
								<div className="section-container">
									<h3>Textures</h3>
									<div className="buttonTexture-container">
										<div className="acc-button">
											<div>
												<TextureButtons name="Wood Light"/>
											</div>
											<div>
												<TextureButtons name="Wood Dark"/>
											</div>
											<div>
												<TextureButtons name="Metal"/>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* STEP 3 */}
							<div style={{ display: step === 3 ? 'block' : 'none' }}>
								<div className="section-container">
									{/* CALCULATIONS */}
									<OrderSection />
								</div>
							</div>

							{/* Scrollbar */}
							<ScrollArea.Scrollbar className="scrollbar" orientation="vertical">
									<ScrollArea.Thumb className="scrollbar-thumb" />
								</ScrollArea.Scrollbar>
							</>

						</ScrollArea.Viewport>
					</ScrollArea.Root>
					{/* Extra Buttons */}
					{innerWidth > 900 ? <ExtraButtons/> : null}
				</div>
			</div>
		</>
	);
}
