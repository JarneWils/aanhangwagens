import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import "../../style.css"

type ToasterProps = React.ComponentProps<typeof Sonner>

const PopUp = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster"
	  toastOptions={{
		classNames: {
		  toast: "toast",
		  description: "toast-description",
		  actionButton: "toast-action",
		  cancelButton: "toast-cancel",
		},
      }}
      {...props}
    />
  )
}

export default PopUp



// import { useState, useEffect } from "react";
// import { shallow } from "zustand/shallow";
// import useButtonState from "../stores/useButtonState";
// import { motion } from "framer-motion";

// export default function PopUp() {
//   // Store
//   const { jockeyWheel, spareWheel, canopy, meshSideState, loadingRamps } = useButtonState(
//     (state) => ({
//       jockeyWheel: state.jockeyWheel,
//       spareWheel: state.spareWheel,
//       canopy: state.canopy,
//       meshSideState: state.meshSideState,
//       loadingRamps: state.loadingRamps,
//     }),
//     shallow
//   );

//   const duration = 2000;

//   const [addJockeyWheel, setAddJockeyWheel] = useState(false);
//   const [deleteJockeyWheel, setDeleteJockeyWheel] = useState(false);

//   const [addSpareWheel, setAddSpareWheel] = useState(false);
//   const [deleteSpareWheel, setDeleteSpareWheel] = useState(false);

//   const [addCanopy, setAddCanopy] = useState(false);
//   const [deleteCanopy, setDeleteCanopy] = useState(false);

//   const [addMeshSide, setAddMeshSide] = useState(false);
//   const [deleteMeshSide, setDeleteMeshSide] = useState(false);

//   const [addLoadingRamps, setAddLoadingRamps] = useState(false);
//   const [deleteLoadingRamps, setDeleteLoadingRamps] = useState(false);

//   useEffect(() => {
//     if (jockeyWheel === true) {
//       setAddJockeyWheel(true);
//       setDeleteJockeyWheel(false);
//       setAddSpareWheel(false);
//       setDeleteSpareWheel(false);
//       setAddCanopy(false);
//       setDeleteCanopy(false);
//       setTimeout(() => {
//         setAddJockeyWheel(false);
//       }, duration);
//     } else if (jockeyWheel === false) {
//       setDeleteJockeyWheel(true);
//       setAddJockeyWheel(false);
//       setAddSpareWheel(false);
//       setDeleteSpareWheel(false);
//       setAddCanopy(false);
//       setDeleteCanopy(false);
//       setTimeout(() => {
//         setDeleteJockeyWheel(false);
//       }, duration);
//     }
//   }, [jockeyWheel]);

//   useEffect(() => {
//     if (spareWheel === true) {
//       setDeleteJockeyWheel(true);
//       setAddJockeyWheel(false);
//       setAddSpareWheel(true);
//       setDeleteSpareWheel(false);
//       setAddCanopy(false);
//       setDeleteCanopy(false);
//       setTimeout(() => {
//         setAddSpareWheel(false);
//       }, duration);
//     } else if (spareWheel === false) {
//       setDeleteJockeyWheel(true);
//       setAddJockeyWheel(false);
//       setDeleteSpareWheel(true);
//       setAddSpareWheel(false);
//       setAddCanopy(false);
//       setDeleteCanopy(false);
//       setTimeout(() => {
//         setDeleteSpareWheel(false);
//       }, duration);
//     }
//   }, [spareWheel]);

//   useEffect(() => {
//     if (canopy === true) {
//       setDeleteJockeyWheel(false);
//       setAddJockeyWheel(false);
//       setAddSpareWheel(true);
//       setDeleteSpareWheel(false);
//       setAddCanopy(true);
//       setDeleteCanopy(false);
//       setTimeout(() => {
//         setAddCanopy(false);
//       }, duration);
//     } else if (canopy === false) {
//       setDeleteJockeyWheel(true);
//       setAddJockeyWheel(false);
//       setDeleteSpareWheel(false);
//       setAddSpareWheel(false);
//       setAddCanopy(false);
//       setDeleteCanopy(true);
//       setTimeout(() => {
//         setDeleteCanopy(false);
//       }, duration);
//     }
//   }, [canopy]);

//   // Nieuwe useEffect voor meshSideState en loadingRamps
//   useEffect(() => {
//     if (meshSideState === true) {
//       setAddMeshSide(true);
//       setDeleteMeshSide(false);
//       setTimeout(() => {
//         setAddMeshSide(false);
//       }, duration);
//     } else if (meshSideState === false) {
//       setDeleteMeshSide(true);
//       setAddMeshSide(false);
//       setTimeout(() => {
//         setDeleteMeshSide(false);
//       }, duration);
//     }
//   }, [meshSideState]);

//   useEffect(() => {
//     if (loadingRamps === true) {
//       setAddLoadingRamps(true);
//       setDeleteLoadingRamps(false);
//       setTimeout(() => {
//         setAddLoadingRamps(false);
//       }, duration);
//     } else if (loadingRamps === false) {
//       setDeleteLoadingRamps(true);
//       setAddLoadingRamps(false);
//       setTimeout(() => {
//         setDeleteLoadingRamps(false);
//       }, duration);
//     }
//   }, [loadingRamps]);

//   return (
//     <div style={{ display: window.innerWidth > 1000 ? "block" : "none" }}>
//       {/* Jockeywheel Add */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: addJockeyWheel ? 1 : 0, y: addJockeyWheel ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(197, 241, 195, 1)", color: "rgba(7, 181, 45, 1)" }}
//       >
//         + €60,00 Jockeywheel
//       </motion.div>

//       {/* Jockeywheel Delet */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: deleteJockeyWheel ? 1 : 0, y: deleteJockeyWheel ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(248, 209, 210, 1)", color: "rgba(242, 0, 4, 1)" }}
//       >
//         - €60,00 Jockeywheel
//       </motion.div>

//       {/* Sparewheel Add */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: addSpareWheel ? 1 : 0, y: addSpareWheel ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(197, 241, 195, 1)", color: "rgba(7, 181, 45, 1)" }}
//       >
//         + €60,00 Sparewheel
//       </motion.div>

//       {/* Sparewheel Delet */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: deleteSpareWheel ? 1 : 0, y: deleteSpareWheel ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(248, 209, 210, 1)", color: "rgba(242, 0, 4, 1)" }}
//       >
//         - €60,00 Sparewheel
//       </motion.div>

//       {/* Canopy Add */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: addCanopy ? 1 : 0, y: addCanopy ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(197, 241, 195, 1)", color: "rgba(7, 181, 45, 1)" }}
//       >
//         + €60,00 Canopy
//       </motion.div>

//       {/* Canopy Delet */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: deleteCanopy ? 1 : 0, y: deleteCanopy ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(248, 209, 210, 1)", color: "rgba(242, 0, 4, 1)" }}
//       >
//         - €60,00 Canopy
//       </motion.div>

//       {/* Mesh Side Add */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: addMeshSide ? 1 : 0, y: addMeshSide ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(197, 241, 195, 1)", color: "rgba(7, 181, 45, 1)" }}
//       >
//         + Mesh Side
//       </motion.div>

//       {/* Mesh Side Delet */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: deleteMeshSide ? 1 : 0, y: deleteMeshSide ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(248, 209, 210, 1)", color: "rgba(242, 0, 4, 1)" }}
//       >
//         - Mesh Side
//       </motion.div>

//       {/* Loading Ramps Add */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: addLoadingRamps ? 1 : 0, y: addLoadingRamps ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(197, 241, 195, 1)", color: "rgba(7, 181, 45, 1)" }}
//       >
//         + Loading Ramps
//       </motion.div>

//       {/* Loading Ramps Delet */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: deleteLoadingRamps ? 1 : 0, y: deleteLoadingRamps ? 0 : -10 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="popup-container"
//         style={{ backgroundColor: "rgba(248, 209, 210, 1)", color: "rgba(242, 0, 4, 1)" }}
//       >
//         - Loading Ramps
//       </motion.div>
//     </div>
//   );
// }
