import useMeasurements from "../stores/useMeasurements";

export default function CalculationConfig() {
	// WEIGHT
	const { totalWeightRounded, totalPriceRounded } = useMeasurements((state) => ({
		totalWeightRounded: state.totalWeightRounded,
		totalPriceRounded: state.totalPriceRounded,
	}));

	return (
		<>
			<div className="extraSpace">
				<div className="section-container" style={{ marginBottom: "70px" }}>
					<h3>Calculations</h3>
					<div className="calculation-row">
						<div className="calculations-container">
							<div className="calculation">Weight:</div>
							<div className="calculated-number">{totalWeightRounded} kg</div>
						</div>
						<div className="calculations-container">
							<div className="calculation">Price:</div>
							<div className="calculated-number">€ {totalPriceRounded}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
