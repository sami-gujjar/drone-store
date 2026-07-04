import { useEffect } from "react";

const keyMap = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  Space: "up",
  ShiftLeft: "down",
  ShiftRight: "down",
};

export default function useKeyControls(controlsRef) {
  useEffect(() => {
    const handleDown = (e) => {
      const action = keyMap[e.code];
      if (action) {
        e.preventDefault();
        controlsRef.current[action] = true;
      }
    };
    const handleUp = (e) => {
      const action = keyMap[e.code];
      if (action) {
        e.preventDefault();
        controlsRef.current[action] = false;
      }
    };

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, [controlsRef]);
}