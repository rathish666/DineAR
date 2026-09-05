import { Component, type ErrorInfo, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Logged for debugging in production consoles / hosting logs.
    console.error("DineAR crashed:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
          <p className="font-display text-xl font-semibold text-charcoal">
            Something went wrong
          </p>
          <p className="max-w-xs text-[14px] text-espresso/65">
            The page hit an unexpected error. Reloading usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-[14px] font-medium text-cream active:bg-clay-dark"
          >
            <RefreshCw size={15} /> Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
