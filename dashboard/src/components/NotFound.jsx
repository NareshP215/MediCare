import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", textAlign: "center", padding: "24px" }}>
      <h1>Page not found</h1>
      <Link to="/">
        <button
          style={{
            backgroundColor: "#1e40af",
            color: "#ffffff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Back to Home page
        </button>
      </Link>
    </div>
  );
};

export default NotFound;


