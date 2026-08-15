import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Spinner,
  Image,
  Badge,
} from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function InventoryTable({
  loading,
  products,
  total,
  skip,
  limit,
  currentPage,
  totalPages,
  setSkip,
  handleOpenEditModal,
  handleOpenDeleteModal,
}) {
  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <h5 className="fw-bold">No products found</h5>
          <p className="small mb-0">Try another search.</p>
        </div>
      ) : (
        <>
          <div
            className="py-3 px-4 border-bottom"
            style={{ backgroundColor: "#F8FAFC" }}
          >
            <Row className="fw-bold text-uppercase small text-muted align-items-center">
              <Col md={4}>Product</Col>
              <Col md={2}>Category</Col>
              <Col md={1}>Price</Col>
              <Col md={2}>Stock</Col>
              <Col md={1}>Status</Col>
              <Col md={2} className="text-end">
                Actions
              </Col>
            </Row>
          </div>

          <div>
            {products.map((product) => {
              const status =
                product.stock === 0
                  ? "Out of Stock"
                  : product.stock <= 10
                  ? "Low Stock"
                  : "In Stock";

              const badgeColor =
                status === "In Stock"
                  ? "success"
                  : status === "Low Stock"
                  ? "warning"
                  : "danger";

              return (
                <div key={product.id} className="py-3 px-4 border-bottom">
                  <Row className="align-items-center">
                    <Col md={4} className="mb-2 mb-md-0">
                      <div className="d-flex align-items-center gap-3">
                        <Image
                          src={product.thumbnail}
                          rounded
                          style={{
                            width: "55px",
                            height: "55px",
                            objectFit: "cover",
                          }}
                          className="border bg-light"
                        />
                        <div>
                          <div className="fw-bold text-dark">
                            {product.title}
                          </div>
                          <div className="text-muted small">
                            SKU: #{product.id}
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col md={2} className="mb-2 mb-md-0">
                      <Badge
                        pill
                        className="px-3 py-2 fw-semibold"
                        bg="light"
                        text="dark"
                      >
                        {product.category}
                      </Badge>
                    </Col>

                    <Col md={1} className="fw-semibold">
                      ${product.price}
                    </Col>

                    <Col md={2}>
                      <span className="fw-bold">{product.stock}</span>
                    </Col>

                    <Col md={1}>
                      <Badge bg={badgeColor} pill className="px-3 py-2">
                        {status}
                      </Badge>
                    </Col>

                    <Col md={2} className="text-md-end">
                      <div className="d-flex justify-content-md-end gap-2 align-items-center">
                        <Button
                          variant="light"
                          className="border rounded-circle p-0 d-inline-flex align-items-center justify-content-center bg-white shadow-sm"
                          style={{ width: "34px", height: "34px", flexShrink: 0 }}
                          onClick={() => handleOpenEditModal(product)}
                          title="Edit"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#475569"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </Button>

                        <Button
                          variant="light"
                          className="border rounded-circle p-0 d-inline-flex align-items-center justify-content-center bg-white shadow-sm"
                          style={{ width: "34px", height: "34px", flexShrink: 0 }}
                          title="Delete"
                          onClick={() => handleOpenDeleteModal(product)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#dc3545"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>

          <div
            className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3"
            style={{ backgroundColor: "#F8FAFC" }}
          >
            <div className="text-muted small fw-semibold mb-2 mb-md-0">
              Showing {skip + 1} to {Math.min(skip + limit, total)} of {total}{" "}
              products
            </div>

            <div className="d-flex align-items-center gap-1">
              <Button
                variant="white"
                size="sm"
                className="border rounded-2 bg-white text-muted px-2 py-1 d-flex align-items-center"
                disabled={skip === 0}
                onClick={() =>
                  setSkip((prev) => Math.max(0, prev - limit))
                }
              >
                <FaChevronLeft size={12} />
              </Button>

              {Array.from({
                length: Math.min(totalPages, 5),
              }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActivePage = pageNum === currentPage;

                return (
                  <Button
                    key={pageNum}
                    size="sm"
                    className="rounded-2 fw-semibold px-3 py-1 border-0"
                    style={{
                      backgroundColor: isActivePage ? "#4318FF" : "#FFFFFF",
                      color: isActivePage ? "#FFFFFF" : "#64748B",
                      boxShadow: isActivePage
                        ? "0 2px 5px rgba(67,24,255,0.3)"
                        : "none",
                    }}
                    onClick={() => setSkip((pageNum - 1) * limit)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span className="text-muted px-1">...</span>
                  <Button
                    size="sm"
                    className="rounded-2 fw-semibold px-3 py-1 bg-white border text-secondary"
                    onClick={() => setSkip((totalPages - 1) * limit)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}

              <Button
                variant="white"
                size="sm"
                className="border rounded-2 bg-white text-muted px-2 py-1 d-flex align-items-center"
                disabled={skip + limit >= total}
                onClick={() => setSkip((prev) => prev + limit)}
              >
                <FaChevronRight size={12} />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}