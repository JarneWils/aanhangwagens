import { shallow } from "zustand/shallow";
import useFormStore from "../stores/useFormStore";
import { useCallback, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import useButtonState from "../stores/useButtonState";
import PDFLib from "./pdf/PDFLib";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

export default function Form() {
	const { setFirstName, firstName, setLastName, lastName, setPhoneNumber, phoneNumber, setEMail, eMail } = useFormStore(
		(state) => ({
			setFirstName: state.setFirstName,
			firstName: state.firstName,
			setLastName: state.setLastName,
			lastName: state.lastName,
			setPhoneNumber: state.setPhoneNumber,
			phoneNumber: state.phoneNumber,
			setEMail: state.setEMail,
			eMail: state.eMail,
		}),
		shallow
	);
	const { savePdf, setSavePdf, setPaying } = useButtonState(
		(state) => ({
			savePdf: state.savePdf,
			setSavePdf: state.setSavePdf,
			setPaying: state.setPaying,
		}),
		shallow
	);

	const [formIsVisible, setFormIsVisible] = useState(true);

	const [saveBtnVisible, setSaveBtnVisible] = useState(false);

	// submit handler
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (isEmailValid) {
			setSavePdf(false);
			setSaveBtnVisible(false);
			setFormIsVisible(true);
			setPaying(true);
		} else {
			alert("email is niet geldig");
		}
	};

	// close button
	const handleCloseForm = useCallback(() => {
		setSavePdf(false);
		setSaveBtnVisible(false);
		setFormIsVisible(true);
	}, [setSavePdf]);

	// terug naar form
	const handleBack = useCallback(() => {
		setSaveBtnVisible(false);
		setFormIsVisible(true);
	}, []);

	// geldig telefoonnummer
	const formatPhoneNumber = (value: string) => {
		return value
			.replace(/\D/g, "") // Verwijdert niet-numerieke tekens
			.replace(/(\d{4})(\d{2})(\d{2})(\d{0,2})/, "$1 $2 $3 $4")
			.trim();
	};

	// geldig email
	const [isEmailValid, setIsEmailValid] = useState(true);
	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setIsEmailValid(emailRegex.test(email));
	};

	return (
		<>
			<div className="form-visible" style={savePdf === true ? { display: "block" } : { display: "none" }}>
				<div className="form-blur-bg">
					<form onSubmit={handleSubmit}>
						<div className="form-container" style={formIsVisible === true ? { display: "block" } : { display: "none" }}>
							{/* CLOSE BUTTON */}
							<button type="button" className="form-close-btn" onClick={handleCloseForm}>
								<IoMdCloseCircle />
							</button>

							{/* FIRST NAME */}
							<div className="input-container">
								<div className="form-div">first name:</div>
								<input
									type="text"
									name="naam"
									className="form-input"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>

							{/* LAST NAME */}
							<div className="input-container">
								<div className="form-div">last name:</div>
								<input
									type="text"
									name="naam"
									className="form-input"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>

							{/* GSM */}
							<div className="input-container">
								<div className="form-div">gsm:</div>
								<input
									type="text"
									name="naam"
									className="form-input"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
								/>
							</div>

							{/* E-MAIL */}
							<div className="input-container">
								<div className="form-div">e-mail:</div>
								<input
									type="text"
									name="naam"
									className={`form-input ${isEmailValid ? "" : "invalid"}`}
									value={eMail}
									onChange={(e) => {
										setEMail(e.target.value);
										validateEmail(e.target.value);
									}}
								/>
							</div>

							<button type="submit" className="form-submit-btn">
								Next <IoArrowForwardOutline className="form-submit-btn-icon" />
							</button>
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
