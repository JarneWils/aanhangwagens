import { shallow } from "zustand/shallow";
import useButtonState from "../stores/useButtonState";

export default function Loader ()
{
    const {darkMode} = useButtonState(
        (state) => ({
            darkMode: state.darkMode,
        }),
        shallow
    );

    return <>
    <div style={{opacity: darkMode === false ? 1 : 0}}>
    <div className="loading-container">
    <div className="loader"></div>
    <div className="loadingName">loading 3d model ...</div>
    </div>
    </div>
    </>
}