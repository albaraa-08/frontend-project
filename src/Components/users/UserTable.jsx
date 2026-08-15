import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Spinner,
  Image,
  Badge
} from "react-bootstrap";
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";

export default function UserTable({
  loading,
  users,
  total,
  skip,
  limit,
  currentPage,
  totalPages,
  setSkip,
  handleOpenDeleteModal,
  handleOpenEditModal,
}) {
  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <h5 className="fw-bold">No users found</h5>
          <p className="small mb-0">
            Try searching for a different keyword.
          </p>
        </div>
      ) : (
        <>
          <div
            className="py-3 px-4 border-bottom"
            style={{ backgroundColor: "#F8FAFC" }}
          >
            <Row className="text-muted small fw-bold text-uppercase align-items-center">
              <Col md={3}>USER</Col>
              <Col md={3}>EMAIL ADDRESS</Col>
              <Col md={2}>ROLE</Col>
              <Col md={2}>STATUS</Col>
              <Col md={2} className="text-end">
                ACTIONS
              </Col>
            </Row>
          </div>
          <div>
            {users.map((item) => {
              const isActive = item.id % 3 !== 0;
              // making random users active
              const userRole =
                item.role ||
                (item.username === "emilys" ? "Admin" : "Customer");
              // making sure every user has a role
              const isAdmin = userRole.toLowerCase() === "admin";

              return (
                <div
                  key={item.id}
                  className="py-3 px-4 border-bottom bg-white"
                >
                  <Row className="align-items-center">
                    <Col md={3} className="mb-2 mb-md-0">
                      <div className="d-flex align-items-center gap-3">
                        <Image
                          src={item.image}
                          roundedCircle
                          style={{
                            width: "42px",
                            height: "42px",
                            objectFit: "cover",
                          }}
                          className="bg-light border"
                        />
                        <div>
                          <div className="fw-bold text-dark">
                            {item.firstName} {item.lastName}
                          </div>
                          <div className="text-muted extra-small">
                            Joined Oct 12, 2023
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col
                      md={3}
                      className="text-muted fw-semibold small text-truncate mb-2 mb-md-0"
                    >
                      {item.email}
                    </Col>

                    <Col md={2} className="mb-2 mb-md-0">
                      <Badge
                        pill
                        className="px-3 py-2 fw-semibold"
                        style={{
                          backgroundColor: isAdmin ? "#0d6efd" : "#E2E8F0",
                          color: isAdmin ? "#FFFFFF" : "#475569",
                        }}
                      >
                        {userRole.charAt(0).toUpperCase() +
                          userRole.slice(1)}
                      </Badge>
                    </Col>

                    <Col md={2} className="mb-2 mb-md-0">
                      <div className="d-flex align-items-center gap-2 fw-semibold small">
                        <span
                          style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: isActive
                              ? "#16a34a"
                              : "#94a3b8",
                          }}
                        />
                        <span
                          style={{
                            color: isActive ? "#16a34a" : "#64748b",
                          }}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </Col>

                    <Col md={2} className="text-md-end">
                      <div className="d-flex align-items-center justify-content-md-end gap-2">
                        <Button
                          variant="light"
                          size="sm"
                          className="border-0 text-secondary p-2 rounded-circle"
                          title="Edit User"
                          onClick={() => handleOpenEditModal(item)}
                        >
                          <BsPencil />
                        </Button>

                        <Button
                          variant="light"
                          size="sm"
                          className="border-0 text-danger p-2 rounded-circle"
                          title="Delete User"
                          onClick={() => handleOpenDeleteModal(item)}
                        >
                          <FaTrash size={14} />
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
              Showing {skip + 1} to {Math.min(skip + limit, total)} of {total} users
            </div>

            <div className="d-flex align-items-center gap-1">
              <Button
                variant="white"
                size="sm"
                className="border rounded-2 bg-white text-muted px-2 py-1"
                disabled={skip === 0}
                onClick={() => setSkip((prev) => Math.max(0, prev - limit))}
              >
                <FaChevronLeft size={10} />
              </Button>

              {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
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
                className="border rounded-2 bg-white text-muted px-2 py-1"
                disabled={skip + limit >= total}
                onClick={() => setSkip((prev) => prev + limit)}
              >
                <FaChevronRight size={10} />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}