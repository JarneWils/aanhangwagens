import { shallow } from "zustand/shallow";
import { useCallback, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import useButtonState from "../stores/useButtonState";
import PDFLib from "./pdf/PDFLib";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { baseUrl } from "../../global";

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

	const [visibleVisa, setVisibleVisa] = useState(true);
	const [visiblePaypal, setVisiblePaypal] = useState(false);
	const [visiblePayconiq, setVisiblePayconiq] = useState(false);

	const handleVisibleVisa = useCallback(() => {
		setVisibleVisa(true);
		setVisiblePaypal(false);
		setVisiblePayconiq(false);
	}, []);

	const handleVisiblePaypal = useCallback(() => {
		setVisibleVisa(false);
		setVisiblePaypal(true);
		setVisiblePayconiq(false);
	}, []);

	const handleVisiblePayconiq = useCallback(() => {
		setVisibleVisa(false);
		setVisiblePaypal(false);
		setVisiblePayconiq(true);
	}, []);

	console.log(visibleVisa);


	return (
		<>
			<div className="form-visible" style={paying === true ? { display: "block" } : { display: "none" }}>
				<div className="form-blur-bg">
					<div className="form-container" style={formIsVisible === true ? { display: "block" } : { display: "none" }}>

						{/* CLOSE BUTTON */}
						<button type="button" className="form-close-btn" onClick={handleCloseForm} style={{marginBottom: "64px"}}>
							<IoMdCloseCircle />
						</button>

						<div className="paymethod-container">
							<div className="pay-title">Payment method</div>

							{/* Visa */}
							<button type="button" onClick={handleVisibleVisa} className="method-container" style={visibleVisa === true ? {opacity: 1} : {opacity: 0.3}}>
								<div className="method-dot"></div>
								<div className="method-icon">
									<img src={`${baseUrl}/img/visa-logo.jpg`} alt="Visa" style={{width: "100%", height: "100%"}}/>
								</div>
								<div className="method-text">
									<div className="method-text-title">Visa</div>
									<div className="method-text-info">Continue with Visa</div>
								</div>
							</button>

							{/* Paypal */}
							<button type="button" onClick={handleVisiblePaypal} className="method-container" style={visiblePaypal === true ? {opacity: 1} : {opacity: 0.3}}>
								<div className="method-dot"></div>
								<div className="method-icon">
									<img src={`${baseUrl}/img/paypal-logo.jpg`} alt="Paypal" style={{width: "100%", height: "100%"}}/>
								</div>
								<div className="method-text">
									<div className="method-text-title">Paypal</div>
									<div className="method-text-info">Continue with Paypal</div>
								</div>
							</button>

							{/* Payconiq */}
							<button type="button" onClick={handleVisiblePayconiq} className="method-container" style={visiblePayconiq === true ? {opacity: 1} : {opacity: 0.3}}>
								<div className="method-dot"></div>
								<div className="method-icon">
									<img src={`${baseUrl}/img/payconiq-logo.jpg`} alt="Payconiq" style={{width: "100%", height: "100%"}}/>
								</div>
								<div className="method-text">
									<div className="method-text-title">Payconiq</div>
									<div className="method-text-info">Continue with Payconiq</div>
								</div>
							</button>

						</div>
						
						<div>
							<button type="submit" onClick={handleSubmit} className="form-submit-btn" style={{marginTop: "16px"}}>
								Buy <IoArrowForwardOutline className="form-submit-btn-icon" />
							</button>
						</div>
						
					</div>

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
