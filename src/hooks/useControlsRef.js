import { useRef } from "react";

export default function useControlsRef() {
  return useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });
}