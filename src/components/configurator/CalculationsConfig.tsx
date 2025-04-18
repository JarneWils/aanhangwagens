import { shallow } from "zustand/shallow";
import useMeasurements from "../stores/useMeasurements";

export default function CalculationConfig() {
	// WEIGHT
	const { totalWeightRounded, totalPriceRounded, frameWidth, frameLength, plankHeight } = useMeasurements((state) => ({
			totalWeightRounded: state.totalWeightRounded,
			totalPriceRounded: state.totalPriceRounded,
			frameWidth: state.frameWidth,
			frameLength: state.frameLength,
			plankHeight: state.plankHeight,
		}), shallow
	);

	const totalLength = ((frameLength + 1).toFixed(2)).replace('.', ',');
	const totalWidth = ((frameWidth + 0.5).toFixed(2)).replace('.', ',');
	const totalHeight = ((plankHeight + 0.72 + 1).toFixed(2)).replace('.', ',');

	const formatPrice = new Intl.NumberFormat("nl-BE", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
	}).format(totalPriceRounded);



	return (
		<>
			<div className="extraSpace">
				<div className="section-container" style={{ marginBottom: "70px" }}>
					<h3>Total size</h3>
					<div className="calculation-row">
						<div>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "8px", fontWeight: "bold" }}>Length: </div>
								<div className="calculated-number" style={{ fontWeight: "normal" }}> {totalLength} m</div>
							</div>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "18px", fontWeight: "bold" }}>Width: </div>
								<div className="calculated-number" style={{ fontWeight: "normal" }}> {totalWidth} m</div>
							</div>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "8px", fontWeight: "bold" }}>Height:  </div>
								<div className="calculated-number" style={{ marginLeft: "4px", fontWeight: "normal" }}>  {totalHeight} m</div>
							</div>
						</div>
						<div style={{ marginLeft: "16px" }}>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "6px", fontWeight: "bold" }}>Weight:</div>
								<div className="calculated-number" style={{ fontWeight: "normal" }}>{totalWeightRounded} kg</div>
							</div>
							{/* <div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "6px" }}> ... </div>
								<div className="calculated-number"></div>
							</div> */}
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "20px" , fontWeight: "bold"}}>Price:</div>
								<div className="calculated-number" style={{ fontWeight: "normal" }}>{formatPrice}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
