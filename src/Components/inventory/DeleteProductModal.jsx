import React from "react";
import { Modal, Button } from "react-bootstrap";
import { BsExclamationTriangle, BsXSquare } from "react-icons/bs";

export default function DeleteProductModal({
  show,
  handleClose,
  handleConfirmDelete,
  selectedProduct,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="rounded-4 border-0 shadow-lg overflow-hidden p-3"
      
    >
      <div className="d-flex justify-content-center pt-1 pb-2">
        <div
          style={{
            width: "36px",
            height: "4px",
            backgroundColor: "#E2E8F0",
            borderRadius: "2px",
          }}
        />
      </div>

      <Modal.Body className="p-2 text-center">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
          style={{
            width: "52px",
            height: "52px",
            backgroundColor: "#FEE2E2",
            color: "#DC2626",
          }}
        >
          <BsExclamationTriangle size={22} />
        </div>

        <h4 className="fw-bold text-dark mb-2">Delete Product?</h4>
        <p
          className="text-muted small mb-4 mx-auto"
          style={{ maxWidth: "340px", fontSize: "0.85rem", lineHeight: "1.5" }}
        >
          This action is permanent and cannot be undone. All data associated
          with this product will be removed from the store's inventory.
        </p>

        {selectedProduct && (
          <div
            className="p-3 rounded-3 d-flex align-items-center gap-3 text-start mb-4"
            style={{ backgroundColor: "#F0F4FE" }}
          >
            <img
              src={
                selectedProduct.thumbnail ||
                selectedProduct.image ||
                "https://via.placeholder.com/60"
              }
              alt={selectedProduct.title || "Product"}
              className="rounded-3 border bg-white flex-shrink-0"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <div className="flex-grow-1 min-w-0">
              <span
                className="fw-bold text-uppercase d-block mb-1"
                style={{
                  color:
                    selectedProduct.stock > 0 || selectedProduct.inStock
                      ? "#16A34A"
                      : "#DC2626",
                  fontSize: "0.7rem",
                  letterSpacing: "0.5px",
                }}
              >
                {selectedProduct.stock > 0 || selectedProduct.inStock !== false
                  ? "IN STOCK"
                  : "OUT OF STOCK"}
              </span>

              <h6
                className="fw-bold text-dark text-truncate mb-1"
                style={{ fontSize: "0.95rem" }}
              >
                {selectedProduct.title || "Product Title"}
              </h6>

              <div className="d-flex align-items-center justify-content-between">
                <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                  ID: {selectedProduct.sku || selectedProduct.id || "N/A"}
                </span>
                <span
                  className="fw-bold"
                  style={{ color: "#059669", fontSize: "0.925rem" }}
                >
                  $
                  {Number(selectedProduct.price || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex align-items-center gap-3 pt-1">
          <Button
            variant="light"
            onClick={handleClose}
            className="w-50 py-2 rounded-3 fw-semibold bg-white border"
            style={{
              borderColor: "#818CF8",
              color: "#4F46E5",
              fontSize: "0.875rem",
            }}
          >
            Cancel and Go Back
          </Button>

          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            className="w-50 py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 border-0"
            style={{
              backgroundColor: "#C51D24",
              fontSize: "0.875rem",
            }}
          >
            <BsXSquare size={15} />
            Confirm Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}