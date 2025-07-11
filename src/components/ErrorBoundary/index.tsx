import React, { ErrorInfo } from "react";
import { Button } from "../common";
import { PROFILE_URL } from "@/constants";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <Button
          buttonProps={{
            children: "Something Went wrong",
          }}
          onClick={() => {
            this.setState({ hasError: false, errorMessage: null });
            window.location.href = PROFILE_URL;
          }}
        />
      );
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
