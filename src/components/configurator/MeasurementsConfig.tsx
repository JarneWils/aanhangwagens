import useMeasurements from "../stores/useMeasurements";
import Slider from "./Slider";
import { shallow } from "zustand/shallow";
import { RiResetLeftFill } from "react-icons/ri";
import { useEffect, useState } from "react";

export default function MeasurementsConfig() {

	const { frameLength, setFrameLength, frameWidth, setFrameWidth, plankHeight, setPlankHeight } = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			setFrameLength: state.setFrameLength,
			frameWidth: state.frameWidth,
			setFrameWidth: state.setFrameWidth,
			plankHeight: state.plankHeight,
			setPlankHeight: state.setPlankHeight,
		}),
		shallow
	);

	const [dataFound, setDataFound] = useState(false);

	// reset page
	const handleReset = () => {
		window.location.reload();
	};

	// Haal de configuratie data op via de id en key
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const postId = params.get('id');
		const key = params.get('key');
	
		const setDefaultValues = () => {
			setFrameLength(2.3); // Default length
			setFrameWidth(1.5); // Default width
			setPlankHeight(0.3); // Default height
			console.log("Default values set");
			setDataFound(false);
			setTimeout(() => {
				setDataFound(true);
			}, 2000);
		};
	
		if (!postId || !key) {
			setDefaultValues();
			setDataFound(false);
			setTimeout(() => {
				setDataFound(true);
			}, 4000);
			return;
		}
	
		// Fetch configuratie data via AJAX
		function getConfigurationData(postId: string, key: string) {
			const data = {
				action: 'get_configuration',
				id: postId,
				key: key
			};

			fetch('http://localhost:3000/wp-admin/admin-ajax.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams(data),
			})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					const configData = response.data;
					// console.log('Success: data =', configData);
	
					if (configData.length && configData.width && configData.height) {
						setFrameLength(parseFloat(configData.length));
						setFrameWidth(parseFloat(configData.width));
						setPlankHeight(parseFloat(configData.height));
						setDataFound(true);
					} else {
						setDefaultValues();
						setDataFound(false);
						setTimeout(() => {
							setDataFound(true);
						}, 4000);
					}
				} else {
					setDefaultValues();
					setDataFound(false);
					setTimeout(() => {
						setDataFound(true);
					}, 4000);
				}
			})
			.catch((error) => {
				setDefaultValues();
				setDataFound(false);
				setTimeout(() => {
					setDataFound(true);
				}, 4000);
				console.error('AJAX error:', error);
			});
		}
	
		getConfigurationData(postId, key);
	}, [setFrameLength, setFrameWidth, setPlankHeight]);


	return (
		<>
			{dataFound ? (
				<div className="section-container">
					<h3>
					Trailerbed size{" "}
					<button className="reset-btn" onClick={handleReset}>
						<RiResetLeftFill />
					</button>
				</h3>
				<div className="measurement">
					<div className="slider-title">Length</div>
					<Slider value={frameLength} min={1} max={5} onChange={setFrameLength} />
				</div>
				<div className="measurement">
					<div className="slider-title">Width</div>
					<Slider value={frameWidth} min={1} max={2.2} onChange={setFrameWidth} />
				</div>
				<div className="measurement">
					<div className="slider-title">Height</div>
					<Slider value={plankHeight} min={0.001} max={0.5} onChange={setPlankHeight} />
				</div>
			</div>) : (
				<div className="section-container">
					<div style={{textAlign: "center", fontSize: "0.9em", fontWeight: "normal", marginTop: "24px"}}>Loading data ...</div>
				</div>
			)}
		</>
	);
}
