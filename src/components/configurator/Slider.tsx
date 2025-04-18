import React, { useEffect, useState } from "react";

export default function Slider({
	value,
	min,
	max,
	onChange,
}: {
	value: number;
	min: number;
	max: number;
	onChange: (val: number) => void;
}) {
	// Lokale state om tijdelijke input op te slaan
	const [inputValue, setInputValue] = useState(value.toFixed(2));

	useEffect(() => {
		setInputValue(value.toFixed(2));
	}, [value]);

	// Bij het slepen van de slider direct updaten
	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseFloat(event.target.value);
		setInputValue(newValue.toFixed(2));
		onChange(newValue);
	};

	// Alleen updaten als de gebruiker op Enter drukt of focus verliest
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleBlur = () => {
		let newValue = parseFloat(inputValue);

		// Check of de waarde een geldig getal is
		if (isNaN(newValue)) {
			setInputValue(value.toFixed(2)); // Reset als de invoer ongeldig is
			return;
		}

		// Beperk de waarde tussen min en max
		if (newValue < min) {
			newValue = min;
		} else if (newValue > max) {
			newValue = max;
		}

		setInputValue(newValue.toFixed(2)); // Werk de input bij
		onChange(newValue); // Update de externe state
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			(event.target as HTMLInputElement).blur(); // Simuleer blur bij Enter
		}
	};

	return (
		<div className="slider-container">
			<div>
				<input
					className="slider"
					type="range"
					min={min}
					max={max}
					step="0.05"
					value={value}
					onChange={handleSliderChange}
				/>
			</div>
			<div className="slider-value">
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
				/>
				<span>m</span>
			</div>
		</div>
	);
}
