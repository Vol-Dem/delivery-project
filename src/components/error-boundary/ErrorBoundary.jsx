import { Component } from "react";
import classes from "./ErrorBoundary.module.scss";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
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
