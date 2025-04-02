import { IoMdArrowRoundBack } from "react-icons/io";
import useButtonState from "../stores/useButtonState";
import "../../style.css";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";

export default function BackButton() {
	const { fullScreen } = useButtonState(
		(state) => ({
			fullScreen: state.fullScreen,
		}),
		shallow
	);

	const { setFullScreen } = useButtonState();

	const handleClick = useCallback(() => {
		setFullScreen(!fullScreen);
	}, [setFullScreen, fullScreen]);

	return (
		<>
			{fullScreen === true ? (
				<button className="backButton" onClick={handleClick}>
					<div className="backButton-icon">
						<IoMdArrowRoundBack />
					</div>
				</button>
			) : undefined}
		</>
	);
}
