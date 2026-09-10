import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import classes from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled rendering error", error, info.componentStack);
    this.props.onError?.(error, info);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className={classes.error} role="alert">
          <h1 className={classes["error__title"]}>Something went wrong</h1>
          <p>We could not display this page. Please try again.</p>
          <button
            type="button"
            className={classes["error__button"]}
            onClick={this.resetErrorBoundary}
          >
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
