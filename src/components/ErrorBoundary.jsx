import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("3D Viewer crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="h-full w-full flex flex-col items-center justify-center bg-surface rounded-2xl border border-slate-800 p-6 text-center">
            <p className="text-danger font-semibold mb-2">Unable to load 3D model</p>
            <p className="text-muted text-sm">
              {this.state.error?.message || "Something went wrong rendering this drone."}
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}