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

	const totalLength = (frameLength + 1.2).toFixed(2); // de laadbak + de neus
	const totalWidth = (frameWidth + 0.5).toFixed(2); // de laadbak + de wielen die uitsteken
	const totalHeight = (plankHeight + 0.72 + 1).toFixed(2); // de laadbak + de afstand van de grond tot de laadbak + de hoogte van het rekje vanvoor op de laadbak

	return (
		<>
			<div className="extraSpace">
				<div className="section-container" style={{ marginBottom: "70px" }}>
					<h3>Total size</h3>
					<div className="calculation-row">
						<div>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation">Length: </div>
								<div className="calculated-number"> {totalLength} m</div>
							</div>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "8px" }}>Width: </div>
								<div className="calculated-number"> {totalWidth} m</div>
							</div>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation">Height: </div>
								<div className="calculated-number"> {totalHeight} m</div>
							</div>
						</div>
						<div style={{ marginLeft: "16px" }}>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "6px" }}>Weight:</div>
								<div className="calculated-number">{totalWeightRounded} kg</div>
							</div>
							<div className="calculations-container" style={{ marginBottom: "8px" }}>
								<div className="calculation" style={{ marginRight: "16px"}}>Price:</div>
								<div className="calculated-number">€{totalPriceRounded}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
