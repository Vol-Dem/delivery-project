import { Component } from "react";
import classes from "./ErrorBoundary.module.scss";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }
  componentDidCatch(error, info) {
    console.log(error, info.componentStack);
    // console.log(error.message);
  }

  render() {
    if (this.state.hasError) {
      return <div className={classes.error}>{this.state.errorMessage}</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
