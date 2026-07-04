import React from "react";
import ReactDOM from "react-dom/client";
import { useGLTF } from "@react-three/drei";
import App from "./App.jsx";
import drones from "./data/drones";
import "./index.css";

// Preload every drone model once, at app startup
drones.forEach((drone) => useGLTF.preload(drone.model));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);