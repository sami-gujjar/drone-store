import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaArrowUp, FaArrowDown } from "react-icons/fa";

function TouchButton({ onPress, onRelease, children, className = "" }) {
  const handlers = {
    onPointerDown: (e) => {
      e.preventDefault();
      onPress();
    },
    onPointerUp: (e) => {
      e.preventDefault();
      onRelease();
    },
    onPointerLeave: () => onRelease(),
    onPointerCancel: () => onRelease(),
  };

  return (
    <button
      {...handlers}
      className={`select-none touch-none active:scale-95 active:bg-primary active:text-dark
        bg-surface/90 border border-slate-700 rounded-xl flex items-center justify-center
        text-slate-200 transition-transform ${className}`}
    >
      {children}
    </button>
  );
}

export default function TouchControls({ controlsRef }) {
  const set = (action, value) => {
    controlsRef.current[action] = value;
  };

  return (
    <>
      {/* Movement D-pad — bottom left */}
      <div className="absolute bottom-6 left-6 grid grid-cols-3 grid-rows-3 gap-2 w-40 h-40 md:hidden">
        <div />
        <TouchButton
          onPress={() => set("forward", true)}
          onRelease={() => set("forward", false)}
          className="col-start-2 row-start-1 w-12 h-12"
        >
          <FaChevronUp size={18} />
        </TouchButton>
        <div />

        <TouchButton
          onPress={() => set("left", true)}
          onRelease={() => set("left", false)}
          className="col-start-1 row-start-2 w-12 h-12"
        >
          <FaChevronLeft size={18} />
        </TouchButton>
        <div />
        <TouchButton
          onPress={() => set("right", true)}
          onRelease={() => set("right", false)}
          className="col-start-3 row-start-2 w-12 h-12"
        >
          <FaChevronRight size={18} />
        </TouchButton>

        <div />
        <TouchButton
          onPress={() => set("backward", true)}
          onRelease={() => set("backward", false)}
          className="col-start-2 row-start-3 w-12 h-12"
        >
          <FaChevronDown size={18} />
        </TouchButton>
        <div />
      </div>

      {/* Altitude controls — bottom right */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 md:hidden">
        <TouchButton
          onPress={() => set("up", true)}
          onRelease={() => set("up", false)}
          className="w-14 h-14"
        >
          <FaArrowUp size={20} />
        </TouchButton>
        <TouchButton
          onPress={() => set("down", true)}
          onRelease={() => set("down", false)}
          className="w-14 h-14"
        >
          <FaArrowDown size={20} />
        </TouchButton>
      </div>
    </>
  );
}