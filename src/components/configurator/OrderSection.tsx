import { shallow } from "zustand/shallow";
import useMeasurements from "../stores/useMeasurements";
import useButtonState from "../stores/useButtonState";
import useMaterialState from "../stores/useMaterialState";
import { baseUrl } from "../../global";
import { IoArrowForwardOutline, IoPricetagsOutline } from "react-icons/io5";
import { useCallback } from "react";


export default function OrderSection() {

	// import material state
	const { frameLength, frameWidth, plankHeight, totalPriceRounded, totalWeightRounded } = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			frameWidth: state.frameWidth,
			plankHeight: state.plankHeight,
			totalPriceRounded: state.totalPriceRounded,
			totalWeightRounded: state.totalWeightRounded,
		}),
		shallow
	);
	
	const { jockeyWheel, meshSideState, spareWheel, canopy, loadingRamps } = useButtonState(
		(state) => ({
			jockeyWheel: state.jockeyWheel,
			meshSideState: state.meshSideState,
			spareWheel: state.spareWheel,
			canopy: state.canopy,
			loadingRamps: state.loadingRamps,
		}),
		shallow
	)
	const { plankMaterialWoodLight, plankMaterialWoodDark, plankMaterialMetal } = useMaterialState(
		(state) => ({
			plankMaterialWoodLight: state.plankMaterialWoodLight,
			plankMaterialWoodDark: state.plankMaterialWoodDark,
			plankMaterialMetal: state.plankMaterialMetal
		}),
		shallow
	);
	const { setSavePdf, savePdf } = useButtonState(
		(state) => ({
			setSavePdf: state.setSavePdf,
			savePdf: state.savePdf,
		}),
		shallow
	);

	const onHandleSave = useCallback(() => {
		setSavePdf(!savePdf);
	}, [setSavePdf, savePdf]);

	const imgPath = plankMaterialWoodLight ? `${baseUrl}/img/woodLight.png` : plankMaterialWoodDark ? `${baseUrl}/img/woodDark.png` : plankMaterialMetal ? `${baseUrl}/img/metal.png` : "";

	return(
		<div className="order-section-container">
			<h3> Order</h3>
			<div className="order-section-grid">
				{/* SIZE */}
				<div className="order-section-item">
					<p className="order-section-subtitle">Size:</p>
					<p className="order-section-text">{(frameLength + 1.2).toFixed(2)} x {(frameWidth + 0.5).toFixed(2)} x {(plankHeight + 0.72 + 1).toFixed(2)} m</p>
				</div>
				{/* WEIGHT */}
				<div className="order-section-item">
					<p className="order-section-subtitle">Weight:</p>
					<p className="order-section-text">{totalWeightRounded} kg</p>
				</div>
				{/* TEXTURE */}
				<div className="order-section-item" style={{marginTop: "8px"}}>
					<div className="order-section-subtitle2" style={{marginTop: "8px"}}>
						<div><img className="order-texture-icon" src={imgPath}/></div>
						<div>Texture:</div>
					</div>
					{plankMaterialWoodLight ? (
						<>
						<p className="order-section-text">Light Wood</p>
						<p className="order-section-text">multiplex</p>
						</>
					) : ""}
					{plankMaterialWoodDark ? (
						<>
						<p className="order-section-text">Dark Wood</p>
						<p className="order-section-text">multiplex</p>
						</>
					) : ""}
					{plankMaterialMetal ? (
						<>
						<p className="order-section-text">Metal</p>
						<p className="order-section-text">multiplex</p>
						</>
					) : ""}
				</div>
				{/* ACCESSOIRES */}
				<div className="order-section-item">
					<p className="order-section-subtitle">Accessores:</p>
					<p className="order-section-text">{jockeyWheel ? "jockey wheel," : ""}</p>
					<p className="order-section-text">{meshSideState ? "mesh side," : ""}</p>
					<p className="order-section-text">{spareWheel ? "spare wheel," : ""}</p>
					<p className="order-section-text">{canopy ? "canopy," : ""}</p>
					<p className="order-section-text">{loadingRamps ? "loading ramps," : ""}</p>
				</div>
			</div>
			{/* PRICE */}
			<div className="order-section-flex">
				<div className="order-section-flex-item">
					<p><IoPricetagsOutline style={{fontSize: "1.2em", marginRight: "16px", marginBottom: "-4px"}}/>€ {totalPriceRounded}</p>
				</div>
				<div className="order-section-flex-item">
					<button className="order-section-btn" onClick={onHandleSave}> Save <IoArrowForwardOutline className="form-submit-btn-icon" /></button>
				</div>
			</div>
		</div>
	)
}

