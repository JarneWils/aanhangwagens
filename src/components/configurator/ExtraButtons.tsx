import { useCallback } from "react";
import useButtonState from "../stores/useButtonState";
import { shallow } from "zustand/shallow";

export default function ExtraButtons() {
	const { setSavePdf, savePdf, paying, setPaying } = useButtonState(
		(state) => ({
			setSavePdf: state.setSavePdf,
			savePdf: state.savePdf,
			paying: state.paying,
			setPaying: state.setPaying,
		}),
		shallow
	);

	const onHandleConfigurator = useCallback(() => {
		setSavePdf(false);
		setPaying(false);
	}, [setSavePdf, setPaying]);

	const onHandleForm = useCallback(() => {
		setSavePdf(true);
		setPaying(false);
	}, [setSavePdf, setPaying]);

	const onHandlePayment = useCallback(() => {
		setSavePdf(false);
		setPaying(true);
	}, [setSavePdf, setPaying]);

	return (
		<>
			<div className="extra-buttons-container" style={{display: innerWidth > 950 ? 'flex' : 'none'}}>
				<div className="extra-btn">
					<button
						className="sva-btn"
						onClick={onHandleConfigurator}
						style={{color: savePdf === false && paying === false ? "var(--color-accent)" : undefined}}>
						Configurator
					</button>
				</div>
				<div className="extra-btn">
					<button className="sva-btn"
						onClick={onHandleForm}
						style={{ color: savePdf === true && paying === false ? "var(--color-accent)" : undefined }}>
						Form
					</button>
				</div>
				<div className="extra-btn">
					<button className="sva-btn"
					onClick={onHandlePayment}
					style={{ color: paying === true && savePdf === false ? "var(--color-accent)" : undefined }}
					>	
						Payment
					</button>
				</div>
			</div>
		</>
	);
}
