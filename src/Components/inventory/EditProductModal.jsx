import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { BsCamera, BsSave } from "react-icons/bs";

export default function EditProductModal({
  show,
  handleClose,
  handleUpdateProduct,
  formData = {},
  handleInputChange,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      contentClassName="rounded-4 border-0 shadow-lg overflow-hidden"
    >
      <Modal.Header closeButton className="border-bottom bg-light px-4 py-3">
        <div>
          <Modal.Title className="fw-bold fs-5 text-dark mb-0">
            Edit Product
          </Modal.Title>
          <p className="text-muted small mb-0 mt-1">
            Update details for {formData.title || "Product"}
          </p>
        </div>
      </Modal.Header>

      <Form onSubmit={handleUpdateProduct}>
        <Modal.Body className="p-4 bg-white">
          <Row className="g-4">
            <Col lg={5} className="d-flex flex-column gap-3">
              <div>
                <Form.Label className="fw-bold extra-small text-secondary text-uppercase mb-2">
                  Product Images
                </Form.Label>

                <div
                  className="rounded-3 border border-2 border-primary overflow-hidden mb-2 shadow-sm"
                  style={{ height: "180px", borderColor: "#4318FF" }}
                >
                  <img
                    src={formData.thumbnail || "https://via.placeholder.com/300"}
                    alt="Main Product"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                <Row className="g-2">
                  <Col xs={6}>
                    <div
                      className="rounded-3 overflow-hidden border"
                      style={{ height: "110px" }}
                    >
                      <img
                        src={
                          formData.thumbnail ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Thumbnail"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div
                      className="rounded-3 border border-2 d-flex flex-column align-items-center justify-content-center text-muted bg-light cursor-pointer h-100"
                      style={{
                        height: "110px",
                        borderStyle: "dashed",
                        borderColor: "#CBD5E1",
                      }}
                    >
                      <BsCamera size={22} className="mb-1 text-secondary" />
                      <span
                        className="fw-semibold text-secondary"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Add Image
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg={7}>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary mb-1">
                      Product Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title || ""}
                      onChange={handleInputChange}
                      required
                      className="rounded-3 py-2 border-secondary-subtle"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary mb-1">
                      SKU
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="sku"
                      value={formData.sku || `SW-PRO2-BLK`}
                      onChange={handleInputChange}
                      className="rounded-3 py-2 border-secondary-subtle"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary mb-1">
                      Category
                    </Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category || ""}
                      onChange={handleInputChange}
                      required
                      className="rounded-3 py-2 border-secondary-subtle text-capitalize"
                    >
                      <option value="">Select Category</option>
                      {formData.category && (
                        <option value={formData.category}>
                          {formData.category}
                        </option>
                      )}
                      <option value="electronics">Electronics</option>
                      <option value="footwear">Footwear</option>
                      <option value="apparel">Apparel</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary mb-1">
                      Price (USD)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="rounded-3 py-2 border-secondary-subtle"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary mb-1">
                      Current Stock
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={formData.stock || ""}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="rounded-3 py-2 border-secondary-subtle"
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary mb-1">
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      placeholder="Enter product description..."
                      className="rounded-3 border-secondary-subtle"
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <div
                    className="p-3 rounded-3 d-flex align-items-start gap-2"
                    style={{
                      backgroundColor: "#E6F4EA",
                      color: "#137333",
                      border: "1px solid #CEEAD6",
                    }}
                  >
                    <FaInfoCircle
                      className="mt-1 flex-shrink-0"
                      size={15}
                    />
                    <span
                      style={{ fontSize: "0.825rem", lineHeight: "1.4" }}
                    >
                      Changes will be reflected immediately in the Customer
                      Facing store. Inventory sync takes approximately 2-3
                      minutes.
                    </span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer
          className="border-0 px-4 py-3 justify-content-between align-items-center"
          style={{ backgroundColor: "#F0F4FE" }}
        >
          <Button
            variant="link"
            onClick={handleClose}
            className="text-secondary text-decoration-none p-0 fw-semibold"
          >
            Discard
          </Button>

          <div className="d-flex align-items-center gap-2">
            <Button
              variant="light"
              onClick={handleClose}
              className="px-3 py-2 rounded-3 fw-semibold bg-white border"
              style={{ color: "#4318FF", borderColor: "#C7D2FE" }}
            >
              Duplicate
            </Button>

            <Button
              type="submit"
              className="px-4 py-2 rounded-3 fw-semibold d-flex align-items-center gap-2"
              style={{
                backgroundColor: "#3B1DE2",
                borderColor: "#3B1DE2",
              }}
            >
              <BsSave size={14} />
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}