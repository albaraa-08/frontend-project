import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";

export default function EditUserModal({
  show,
  handleClose,
  handleUpdateUser,
  formData,
  handleInputChange,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
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
            <BsPencil size={20} />
          </div>

          <div>
            <Modal.Title className="fw-bold">
              Edit User
            </Modal.Title>

            <p className="text-muted small mb-0">
              Update this user's information.
            </p>
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleUpdateUser}>
        <Modal.Body className="pt-4">
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Full Name
                </Form.Label>

                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  className="border-0 rounded-3 py-2"
                  style={{ backgroundColor: "#F4F7FE" }}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Username
                </Form.Label>

                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  className="border-0 rounded-3 py-2"
                  style={{ backgroundColor: "#F4F7FE" }}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Email Address
                </Form.Label>

                <div
                  className="d-flex align-items-center rounded-3 px-2"
                  style={{ backgroundColor: "#F4F7FE" }}
                >
                  <FaEnvelope className="text-muted me-2" />

                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="border-0 bg-transparent shadow-none py-2"
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Role
                </Form.Label>

                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="border-0 rounded-3 py-2"
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
                <Form.Label className="fw-semibold">
                  Password
                </Form.Label>

                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  placeholder="Leave blank to keep current password"
                  className="border-0 rounded-3 py-2"
                  style={{ backgroundColor: "#F4F7FE" }}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <div
                className="p-3 rounded-3 d-flex align-items-center gap-3"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <FaInfoCircle
                  size={20}
                  style={{ color: "#4318FF" }}
                />

                <span
                  className="small fw-semibold"
                  style={{ color: "#3B82F6" }}
                >
                  Changes will be reflected immediately after saving.
                </span>
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button
            variant="light"
            onClick={handleClose}
            className="px-4 rounded-3 fw-semibold"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="px-4 rounded-3 fw-semibold d-flex align-items-center gap-2"
            style={{
              backgroundColor: "#4318FF",
              borderColor: "#4318FF",
            }}
          >
            <BsPencil />
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

// dummyjson always returns the original list beacause i use prev in the
//  edit modal maybe i can use localstorage to save it there