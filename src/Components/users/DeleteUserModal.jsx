import React from "react";
import { Modal, Button, Image, Badge } from "react-bootstrap";
import { FaTrash, FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";

export default function DeleteUserModal({
  showDeleteModal,
  handleCloseDeleteModal,
  handleConfirmDelete,
  selectedUser,
}) {
  return (
    <Modal
      show={showDeleteModal}
      onHide={handleCloseDeleteModal}
      centered
      contentClassName="rounded-4 border-0 shadow-lg p-3"
      style={{ maxWidth: "480px", margin: "0 auto" }}
    >
      <Modal.Body className="p-3">
        <div
          style={{
            width: "36px",
            height: "4px",
            backgroundColor: "#E2E8F0",
            borderRadius: "2px",
            margin: "0 auto 20px auto",
          }}
        />

        <div
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
          style={{
            width: "52px",
            height: "52px",
            backgroundColor: "#FEE2E2",
            color: "#DC2626",
          }}
        >
          <FiAlertTriangle size={20} />
        </div>

        {/* Heading and Description */}
        <h4 className="fw-bold text-dark text-center mb-2">
          Delete User Account?
        </h4>

        <p
          className="text-muted text-center small mb-4 px-2"
          style={{ lineHeight: "1.5" }}
        >
          This action cannot be undone. All data associated with this user will
          be permanently removed from the ShopStream systems.
        </p>

        {selectedUser && (
          <div
            className="p-3 rounded-4 mb-4 d-flex align-items-center gap-3"
            style={{
              backgroundColor: "#F0F5FF",
              border: "1px solid #E2E8F0",
            }}
          >
            <div className="position-relative">
              <Image
                src={selectedUser.image}
                roundedCircle
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                }}
                className="bg-white border"
              />

              <span
                className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "#10B981",
                  color: "#FFF",
                }}
              >
                <GoShieldCheck size={10} />
              </span>
            </div>

            <div className="overflow-hidden">
              <h6 className="fw-bold text-dark mb-0 text-truncate">
                {selectedUser.firstName} {selectedUser.lastName}
              </h6>

              <div className="text-muted extra-small text-truncate mb-1">
                {selectedUser.email}
              </div>

              <Badge
                pill
                className="px-2 py-1 fw-semibold"
                style={{
                  backgroundColor: "#EEF2FF",
                  color: "#4318FF",
                  fontSize: "11px",
                }}
              >
                <GoShieldCheck className="me-1" size={12} />
                {selectedUser.role ||
                  (selectedUser.username === "emilys"
                    ? "Admin"
                    : "Senior Inventory Manager")}
              </Badge>
            </div>
          </div>
        )}

        <div className="d-flex gap-2 mb-3">
          <Button
            variant="light"
            onClick={handleCloseDeleteModal}
            className="w-50 py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 border-0"
            style={{
              backgroundColor: "#EEF2FF",
              color: "#334155",
            }}
          >
            <FaArrowLeft size={12} /> Go Back
          </Button>

          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            className="w-50 py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 border-0"
            style={{
              backgroundColor: "#DC2626",
            }}
          >
            <FaTrash size={12} /> Delete User
          </Button>
        </div>

        <div className="text-center text-muted extra-small d-flex align-items-center justify-content-center gap-1">
          <FaInfoCircle size={12} />
          Deleting a user will also revoke all API access keys.
        </div>
      </Modal.Body>
    </Modal>
  );
}