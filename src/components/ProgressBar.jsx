import React from "react";

export default function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-label">
        <span>PROJECT QUESTIONNAIRE</span>
        <span>STEP {current} OF {total}</span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}