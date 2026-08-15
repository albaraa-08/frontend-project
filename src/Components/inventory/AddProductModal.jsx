import React from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";

export default function AddProductModal({
  show,
  handleClose,
  handleCreateProduct,
  formData,
  handleInputChange,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      contentClassName="rounded-4 border-0 shadow-lg p-2"
    >
      <Modal.Header
        closeButton
        className="border-0 pb-0"
      >
        <div className="d-flex align-items-center gap-3">
          <div>
            <Modal.Title className="fw-bold">
              Add Product
            </Modal.Title>
            <p className="text-muted small mb-0">
              Create a new product for your inventory.
            </p>
          </div>

        </div>
      </Modal.Header>
      <Form onSubmit={handleCreateProduct}>
        <Modal.Body className="pt-4">
          <Row className="g-3">
                        <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Product Name
                </Form.Label>

                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                  className="border-0 rounded-3 py-2"
                  style={{
                    backgroundColor: "#F4F7FE",
                  }}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Category
                </Form.Label>

                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g. Smartphones"
                  required
                  className="border-0 rounded-3 py-2"
                  style={{
                    backgroundColor: "#F4F7FE",
                  }}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Price
                </Form.Label>

                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                  min="0"
                  className="border-0 rounded-3 py-2"
                  style={{
                    backgroundColor: "#F4F7FE",
                  }}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Stock Quantity
                </Form.Label>

                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                  min="0"
                  className="border-0 rounded-3 py-2"
                  style={{
                    backgroundColor: "#F4F7FE",
                  }}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Product Image URL
                </Form.Label>

                <Form.Control
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="border-0 rounded-3 py-2"
                  style={{
                    backgroundColor: "#F4F7FE",
                  }}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <div
                className="p-3 rounded-3 d-flex align-items-center gap-3"
                style={{
                  backgroundColor: "#EEF2FF",
                }}
              >

                <span
                  className="small fw-semibold"
                  style={{
                    color: "#3B82F6",
                  }}
                >
                  This product will be added immediately to your inventory.
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
            Add Product
          </Button>

        </Modal.Footer>
      </Form>
    </Modal>
  );
}