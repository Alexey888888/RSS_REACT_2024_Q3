import React from 'react';
import { IErrorBoundaryProps, IErrorBoundaryState } from './IErrorBoundary';

import './errorBoundary.scss';

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('ErrorBoundary caught an error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary__wrapper">
          <h1>Something went wrong.</h1>
        </div>
      );
    }
    return this.props.children;
  }
}
