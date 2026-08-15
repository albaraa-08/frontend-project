import React from "react";
import { Card } from "react-bootstrap";

export default function StatCard({
  icon,
  title,
  value,
  bgColor,
  iconColor,
}) {
  return (
    <Card className="border-0 shadow-sm rounded-4 p-3 bg-white">
      <div className="d-flex align-items-center gap-3">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: bgColor,
            color: iconColor,
          }}
        >
          {icon}
        </div>

        <div>
          <div className="text-muted small fw-bold">
            {title}
          </div>

          <div className="fs-4 fw-bold text-dark">
            {value}
          </div>
        </div>
      </div>
    </Card>
  );
}