import {Component} from "react";
import ErrorPage from "./index"
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} errorInfo={this.state.errorInfo}/>
    }
    return this.props.children;
  }
}

export default ErrorBoundary

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

ErrorBoundary.defaultProps = {
  children: null
}