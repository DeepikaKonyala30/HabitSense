import { Component } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

/**
 * ErrorBoundary - Catches React errors and displays graceful error UI
 * Prevents entire app from crashing on component errors
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally reload the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
          <div className="bg-white rounded-2xl shadow-elevated p-8 max-w-md w-full">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-danger-50 p-4 rounded-full">
                <AlertTriangle className="w-8 h-8 text-danger-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-display font-bold text-neutral-900 text-center mb-2">
              Oops! Something went wrong
            </h1>
            
            <p className="text-neutral-600 text-center mb-6">
              We encountered an unexpected error. Don't worry, we're working on it. Try refreshing the page or go back home.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                aria-label="Refresh page"
              >
                <RotateCcw size={18} />
                Refresh Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                aria-label="Go to home page"
              >
                Go Home
              </button>
            </div>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 pt-6 border-t border-neutral-200">
                <summary className="text-sm text-neutral-600 cursor-pointer hover:text-neutral-900 font-semibold">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-3 text-xs bg-neutral-50 p-3 rounded overflow-auto text-danger-600 max-h-48">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
