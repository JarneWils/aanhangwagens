import useButtonState from "../../stores/useButtonState";
import { shallow } from "zustand/shallow";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import PDFLib from "./PDFLib";

export default function Eport() {
	const pdfRef = useRef<HTMLDivElement>(null);

	const { savePdf } = useButtonState(
		(state) => ({
			savePdf: state.savePdf,
		}),
		shallow
	);

	const exportAsPDF = async () => {
		if (!pdfRef.current) return;
		const canvas = await html2canvas(pdfRef.current, { scale: 2 });
		const imgData = canvas.toDataURL("image/png");

		const pdf = new jsPDF("p", "mm", "a4");
		const imgWidth = 210;
		const imgHeight = (canvas.height * imgWidth) / canvas.width;

		pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
		pdf.save("configuratie.pdf");
	};

	return (
		<>
			{savePdf === true ? (
				<div>
					<div className="pdf-btn-container">
						{/* Download-knop */}
						<PDFLib />
						{/* Save Document */}
						<button onClick={exportAsPDF} className="pdf-save-btn">
							save as ...
						</button>
						{/* Save Document */}
						<button onClick={exportAsPDF} className="pdf-save-btn">
							import file ...
						</button>
					</div>
				</div>
			) : null}
		</>
	);
}
