import React from "react";
import { Link } from "react-router-dom";
import "./ErrorBoundary.css";

const ErrorBoundary = () => {
  return (
    <div className="error-boundary">
      <h1>Oops!</h1>
      <h2>Something went wrong</h2>
      <p>We're sorry for the inconvenience. Please try again later.</p>
      <Link to="/teacher-dashboard" className="back-home">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ErrorBoundary;
