import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { LuUserRoundPlus } from "react-icons/lu";

export default function AddUserModal({
  show,
  handleCloseModal,
  handleCreateUser,
  formData,
  handleInputChange,
}) {
  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      centered
      size="lg"
      contentClassName="rounded-4 border-0 shadow-lg p-2"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EEF2FF",
              color: "#4318FF",
            }}
          >
            <LuUserRoundPlus size={22} />
          </div>

          <div>
            <Modal.Title className="fw-bold text-dark fs-5 mb-0">
              Add New User
            </Modal.Title>
            <p className="text-muted small mb-0">
              Create a new account for your store management team.
            </p>
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleCreateUser}>
        <Modal.Body className="pt-4">
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Johnathan Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="py-2 border-0 rounded-3"
                  style={{ backgroundColor: "#F4F7FE" }}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="@ johndoe"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="py-2 border-0 rounded-3"
                  style={{ backgroundColor: "#F4F7FE" }}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Email Address
                </Form.Label>

                <div
                  className="d-flex align-items-center rounded-3 px-2 overflow-hidden"
                  style={{ backgroundColor: "#F4F7FE" }}
                >
                  <FaEnvelope className="text-muted ms-2 me-1" />

                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="john@shopstream.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-0 bg-transparent shadow-none py-2"
                    required
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Role
                </Form.Label>

                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="py-2 border-0 rounded-3"
                  style={{ backgroundColor: "#F4F7FE" }}
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Password
                </Form.Label>

                <Form.Control
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="py-2 border-0 rounded-3"
                  style={{ backgroundColor: "#F4F7FE" }}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12} className="mt-4">
              <div
                className="p-3 rounded-3 d-flex align-items-center gap-3"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <FaInfoCircle
                  size={22}
                  style={{ color: "#4318FF" }}
                  className="flex-shrink-0"
                />

                <span
                  className="small fw-semibold"
                  style={{ color: "#3B82F6" }}
                >
                  A verification email will be sent to the new user
                  automatically to set up their multi-factor authentication.
                </span>
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-2">
          <Button
            variant="light"
            onClick={handleCloseModal}
            className="px-4 py-2 rounded-3 fw-semibold border bg-white text-secondary"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="px-4 py-2 rounded-3 fw-semibold d-flex align-items-center gap-2"
            style={{
              backgroundColor: "#4318FF",
              borderColor: "#4318FF",
            }}
          >
            <LuUserRoundPlus size={18} />
            Create User
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}