import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import useButtonState from "../../stores/useButtonState";
import { shallow } from "zustand/shallow";
import useMeasurements from "../../stores/useMeasurements";
import "../../../style.css";
import useThreeStore from "../../stores/useThreeStore";
import { Vector2 } from "three";
import useFormStore from "../../stores/useFormStore";
import useMaterialState from "../../stores/useMaterialState";


export default function PDFLib() {
	const { renderer, scene, camera } = useThreeStore((state: any) => ({
		renderer: state.renderer,
		scene: state.scene,
		camera: state.camera,
	}));
	const { frameLength, frameWidth, plankHeight, totalWeightRounded, totalPriceRounded } = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			frameWidth: state.frameWidth,
			plankHeight: state.plankHeight,
			totalWeightRounded: state.totalWeightRounded,
			totalPriceRounded: state.totalPriceRounded,
		}),
		shallow
	);
	const { jockeyWheel, meshSideState, spareWheel, canopy, loadingRamps, setSavePdf, darkMode, setDarkMode, setScreenShot } = useButtonState(
		(state) => ({
			jockeyWheel: state.jockeyWheel,
			meshSideState: state.meshSideState,
			spareWheel: state.spareWheel,
			canopy: state.canopy,
			loadingRamps: state.loadingRamps,
			setSavePdf: state.setSavePdf,
			darkMode: state.darkMode,
			setDarkMode: state.setDarkMode,
			screenShot: state.screenShot,
			setScreenShot: state.setScreenShot,
		}),
		shallow
	);
	const { firstName, lastName, phoneNumber, eMail } = useFormStore(
		(state) => ({
			firstName: state.firstName,
			lastName: state.lastName,
			phoneNumber: state.phoneNumber,
			eMail: state.eMail,
		}),
		shallow
	);
	const { plankMaterialWoodLight, plankMaterialWoodDark, plankMaterialMetal } = useMaterialState(
		(state) => ({
			plankMaterialWoodLight: state.plankMaterialWoodLight,
			plankMaterialWoodDark: state.plankMaterialWoodDark,
			plankMaterialMetal: state.plankMaterialMetal,
		}),
		shallow
	);

	

	// create pdf
	async function createPdf() {
		setTimeout(() => {
			setSavePdf(false);
		}, 1000);
		const pdfDoc = await PDFDocument.create();

		// screenshot size
		const imgWidth = 1920;
		const imgHeight = 1080;

		// resize render
		if (!renderer) return;
		// save old size for later
		const oldSize = new Vector2();
		renderer.getSize(oldSize);
		renderer.setSize(imgWidth, imgHeight);

		// get the scene
		if (!scene) return;

		// save darkmode state
		const darkModeState = darkMode;
		// set background light mode for the screenshot
		setDarkMode(false);

		// set screenShot to true
		setScreenShot(true);

		// resize camera
		if (!camera) return;
		camera.aspect = imgWidth / imgHeight;
		camera.updateProjectionMatrix();

		// Get the 3D canvas.
		const renderCanvas = document.querySelector<HTMLCanvasElement>(".main canvas");
		if (!renderCanvas) return;
		camera.position.set(-2 - frameLength, 0.1, 4);

		// Render the scene.
		renderer.render(scene, camera);
		await new Promise((resolve) => setTimeout(resolve, 1));
		await new Promise((resolve) => requestAnimationFrame(resolve));

		// take screenshot with data
		const screenshot = renderCanvas.toDataURL("image/png");

		// if the darkmode was false, set it back to the previous state
		if (darkModeState === false) {
			setDarkMode(false);
		} else if (darkModeState === true) {
			setDarkMode(true);
		}
		// set screenShot to false
		setTimeout(() => {
			setScreenShot(false);
		}, 500);

		// Set the renderer and camera size back to the old size.
		renderer.setSize(oldSize.x, oldSize.y);
		camera.position.set(-4, 1.25, 4);
		camera.aspect = oldSize.x / oldSize.y;
		camera.updateProjectionMatrix();

		// screenshot data omzetten naar png
		const imageBytes = await fetch(screenshot).then((res) => res.arrayBuffer());
		const pngImage = await pdfDoc.embedPng(imageBytes);

		// units in cm zetten
		function cm(cm: number) {
			return cm * 28.3464566929;
		}

		//page size
		const page = pdfDoc.addPage([cm(21.0), cm(29.7)]);

		// pdf const
		const { height, width } = page.getSize();
		const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
		const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const currentDate = new Date().toLocaleDateString("nl-BE", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
		const formatPrice = new Intl.NumberFormat("nl-BE", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 2,
		}).format(totalPriceRounded);

		const totalLength = ((frameLength + 1).toFixed(2)).replace('.', ',');
		const totalWidth = ((frameWidth + 0.5).toFixed(2)).replace('.', ',');
		const totalHeight = ((plankHeight + 0.72 + 1).toFixed(2)).replace('.', ',');
		
		const key = Math.floor(Math.random() * 1000000);

		

		/** HEADER
		 * ------------------------------------------------------------------------------------------
		 */
		page.drawText("Trailer Config", {
			x: cm(1.5),
			y: height - cm(1.8),
			size: 24,
			font: boldFont,
		});
		page.drawText("Your Creation", {
			x: cm(1.5),
			y: height - cm(2.5),
			size: 16,
			font: font,
			color: rgb(1, 0.32, 0.01),
		});
		page.drawText(`Naam  :  ${firstName} ${lastName}`, {
			x: cm(1.5),
			y: height - cm(4.4),
			size: 11,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(`Gsm   :   ${phoneNumber}`, {
			x: cm(1.5),
			y: height - cm(5),
			size: 11,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(`Email  :   ${eMail}`, {
			x: cm(1.5),
			y: height - cm(5.6),
			size: 11,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText("Datum", {
			x: cm(13),
			y: height - cm(5),
			size: 11,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText("Offerte Nr.", {
			x: cm(13),
			y: height - cm(5.6),
			size: 11,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(":", {
			x: cm(16),
			y: height - cm(5),
			size: 11,
			font: boldFont,
			color: rgb(0, 0, 0),
		});
		page.drawText(":", {
			x: cm(16),
			y: height - cm(5.6),
			size: 11,
			font: boldFont,
			color: rgb(0, 0, 0),
		});
		page.drawText(`${currentDate}`, {
			x: cm(17),
			y: height - cm(5),
			size: 11,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(`${key}`, {
			x: cm(17),
			y: height - cm(5.6),
			size: 11,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawLine({
			start: { x: cm(1.5), y: height - cm(6) },
			end: { x: width - cm(1.5), y: height - cm(6) },
			thickness: 1,
			color: rgb(0, 0, 0),
		});

		page.drawText("Product", {
			x: cm(1.5),
			y: height - cm(8.8),
			size: 12,
			font: boldFont,
			color: rgb(1, 0.32, 0.01),
		});
		page.drawLine({
			start: { x: cm(1.5), y: height - cm(9) },
			end: { x: width - cm(1.5), y: height - cm(9) },
			thickness: 1,
			color: rgb(1, 0.32, 0.01),
		});

		/** SCREENSHOT
		 * ------------------------------------------------------------------------------------------
		 */
		page.drawImage(pngImage, {
			x: cm(1.5),
			y: cm(16),
			width: imgWidth / 9,
			height: imgHeight / 9,
		});

		/** Afmetingen
		 * ------------------------------------------------------------------------------------------
		 */

		page.drawText("Afmetingen:", {
			x: cm(10),
			y: height - cm(9.8),
			size: 10,
			font: boldFont,
			color: rgb(0, 0, 0),
		});
		page.drawText(`lengte: ${totalLength}m`, {
			x: cm(10),
			y: height - cm(10.3),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(`breedte: ${totalWidth}m`, {
			x: cm(10),
			y: height - cm(10.8),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(`hoogte: ${totalHeight}m`, {
			x: cm(10),
			y: height - cm(11.3),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});

		/** LAADBAK
		 * ------------------------------------------------------------------------------------------
		 */

		page.drawText("Laadbak:", {
			x: cm(13),
			y: height - cm(9.8),
			size: 10,
			font: boldFont,
			color: rgb(0, 0, 0),
		});
		page.drawText(`lengte: ${totalLength}m`, {
			x: cm(13),
			y: height - cm(10.3),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(`breedte: ${totalWidth}m`, {
			x: cm(13),
			y: height - cm(10.8),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(`hoogte: ${totalHeight}m`, {
			x: cm(13),
			y: height - cm(11.3),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});

		/** ACCESSOIRES
		 * ------------------------------------------------------------------------------------------
		 */

		page.drawText("Accessoires:", {
			x: cm(16),
			y: height - cm(9.8),
			size: 10,
			font: boldFont,
			color: rgb(0, 0, 0),
		});

		page.drawText(jockeyWheel ? "Jockey Wheel" : "...", {
			x: cm(16),
			y: height - cm(10.3),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});

		page.drawText(meshSideState ? "Mesh Sides" : "...", {
			x: cm(16),
			y: height - cm(10.8),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(spareWheel ? "Spare Wheel" : "...", {
			x: cm(16),
			y: height - cm(11.3),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(canopy ? "Canopy" : "...", {
			x: cm(16),
			y: height - cm(11.8),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});
		page.drawText(loadingRamps ? "Loading Ramps" : "...", {	
			x: cm(16),
			y: height - cm(12.3),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});

		/** GEWICHT
		 * ------------------------------------------------------------------------------------------
		 */

		page.drawText("Gewicht", {
			x: cm(10),
			y: height - cm(12.8),
			size: 10,
			font: boldFont,
			color: rgb(0, 0, 0),
		});
		page.drawText(`${totalWeightRounded}kg`, {
			x: cm(10),
			y: height - cm(13.3),
			size: 10,
			font: font,
			color: rgb(0, 0, 0),
		});

		/** PRICE
		 * ------------------------------------------------------------------------------------------
		 */
		page.drawText("TOTAAL PRIJS", {
			x: cm(1.5),
			y: height - cm(16.8),
			size: 12,
			font: boldFont,
			color: rgb(0, 0, 0),
		});
		page.drawLine({
			start: { x: cm(1.5), y: height - cm(17.2) },
			end: { x: width - cm(1.5), y: height - cm(17.2) },
			thickness: 1,
			color: rgb(0, 0, 0),
		});
		page.drawText(`${formatPrice}`, {
			x: cm(1.5),
			y: height - cm(18),
			size: 16,
			font: boldFont,
			color: rgb(1, 0.32, 0.01),
		});

		/** LINK
		 * ------------------------------------------------------------------------------------------
		 */

		// binair opslaan van de pdf en wacht tot dit klaar is
		const pdfBytes = await pdfDoc.save();

		// Zet het PDF-bestand om naar een Blob en maak een downloadlink
		const blob = new Blob([pdfBytes], { type: "application/pdf" });
		// onzichtbare link maken
		const link = document.createElement("a");
		// tijdelijke url die naar de blob verwijst
		link.href = URL.createObjectURL(blob);
		// download de pdf
		link.download = "trailer-creation.pdf";
		//zet de tijdelijke linkt in de body
		document.body.appendChild(link);
		// automatisch downloaden van de link
		link.click();
		// de link terug verijderen uit de body
		document.body.removeChild(link);

		//convert pdf blob naar base64
		const pdfBase64 = await pdfDoc.saveAsBase64();

		/**
		 * DATA NAAR DE DATABASE STUREN---------------------------------------------------
		 */
		const formData = new FormData();
		// moet van wordpress :(
		formData.append("action", "create_configuration");
		// date uit store halen
		// price
		formData.append("price", totalPriceRounded.toString());
		// weight
		formData.append("weight", totalWeightRounded.toString());
		// frameWidth
		formData.append("width", frameWidth.toFixed(2).toString());
		// frameLength
		formData.append("length", frameLength.toFixed(2).toString());
		// plankHeight
		formData.append("height", plankHeight.toFixed(2).toString());
		// screenshot
		formData.append("screenshot", screenshot);
		// pdf
		formData.append("pdf", pdfBase64);
		// jockeyWheel boolean
		formData.append("jockey_wheel", jockeyWheel ? "1" : "0");
		// meshSideState boolean
		formData.append("mesh_sides", meshSideState ? "1" : "0");
		// spareWheel boolean
		formData.append("spare_wheel", spareWheel ? "1" : "0");
		// woodLight boolean
		formData.append("wood_light", plankMaterialWoodLight ? "1" : "0");
		// woodDark boolean
		formData.append("wood_dark", plankMaterialWoodDark ? "1" : "0");
		// metal boolean
		formData.append("metal", plankMaterialMetal ? "1" : "0");
		// canopy boolean
		formData.append("canopy", canopy ? "1" : "0");
		// loadingRamps boolean
		formData.append("loading_ramps", loadingRamps ? "1" : "0");
		// send automatic email
		formData.append("email_adress", eMail);
		// name
		formData.append("name", `${firstName} ${lastName}`);
		// key
		formData.append("key", key.toString());

		// send data to the database
		fetch("http://localhost:3000/wp-admin/admin-ajax.php", {
			method: "POST",
			body: formData,
		})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => console.error("Error:", error));
	}

	return (
		<>
			<button className="pdf-save-btn" onClick={() => { 
				createPdf(); 
			}}>
				Download PDF
			</button>
		</>
	);
}
