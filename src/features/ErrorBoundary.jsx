import React, { Component } from 'react';
import { Button } from '../design-system/components';
import './ErrorBoundary.css';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('PlumberManager ErrorBoundary caught an exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="ds-error-boundary-container">
          <div className="ds-error-boundary-card">
            <div className="ds-error-boundary-icon">⚠️</div>
            <h2 className="ds-error-boundary-title">Something went wrong</h2>
            <p className="ds-error-boundary-msg">
              An unexpected error occurred in the PlumberManager UI module.
            </p>

            {this.state.error && (
              <div className="ds-error-boundary-details">
                <strong>{this.state.error.name}:</strong> {this.state.error.message}
                {this.state.errorInfo && (
                  <div style={{ marginTop: '8px', opacity: 0.8 }}>
                    {this.state.errorInfo.componentStack}
                  </div>
                )}
              </div>
            )}

            <div className="ds-error-boundary-actions">
              <Button variant="secondary" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button variant="primary" onClick={this.handleReload}>
                Reload Application
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
