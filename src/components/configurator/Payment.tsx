import { shallow } from "zustand/shallow";
import { useCallback, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import useButtonState from "../stores/useButtonState";
import PDFLib from "./pdf/PDFLib";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

export default function Payment() {

	const { paying, setPaying} = useButtonState(
		(state) => ({
			paying: state.paying,
			setPaying: state.setPaying
		}),
		shallow
	);

	const [formIsVisible, setFormIsVisible] = useState(true);

	const [saveBtnVisible, setSaveBtnVisible] = useState(false);

	// submit handler
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setSaveBtnVisible(true);
		setFormIsVisible(false);
	};

	// close button
	const handleCloseForm = useCallback(() => {
		setPaying(false);
		setSaveBtnVisible(false);
		setFormIsVisible(true);
	}, [setPaying]);

	// terug naar form
	const handleBack = useCallback(() => {
		setSaveBtnVisible(false);
		setFormIsVisible(true);
	}, []);


	return (
		<>
			<div className="form-visible" style={paying === true ? { display: "block" } : { display: "none" }}>
				<div className="form-blur-bg">
					<form onSubmit={handleSubmit}>
						<div className="form-container" style={formIsVisible === true ? { display: "block" } : { display: "none" }}>

							{/* CLOSE BUTTON */}
							<button type="button" className="form-close-btn" onClick={handleCloseForm}>
								<IoMdCloseCircle />
							</button>
							
							<div>
								<button type="submit" className="form-submit-btn">
									Buy <IoArrowForwardOutline className="form-submit-btn-icon" />
								</button>
							</div>
							
						</div>
					</form>

					{/* SAVE BUTTONS */}
					<div
						className="save-visible"
						style={saveBtnVisible === true && formIsVisible === false ? { display: "block" } : { display: "none" }}
					>
						{/* CLOSE BUTTON */}
						<button type="button" className="form-close-btn2" onClick={handleCloseForm}>
							<IoMdCloseCircle />
						</button>
						{/* Back button */}
						<div>
							<button type="button" className="form-submit-btn" onClick={handleBack}>
								<IoArrowBackOutline className="form-submit-btn-icon" />
								Back
							</button>
						</div>

						{/* Download button */}
						<div>
							<PDFLib />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
