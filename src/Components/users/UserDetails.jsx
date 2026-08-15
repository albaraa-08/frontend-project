import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image, Spinner, Badge } from "react-bootstrap";
import { FaArrowLeft, FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { API } from "../../api/apiServices";
import Errorhandling from "../../utlis/Errorhandling";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSingleUser() {
      try {
        setLoading(true);
        const response = await API.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        Errorhandling(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchSingleUser();
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5 min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h4>User not found</h4>
        <Button as={Link} to="/users" variant="primary" className="mt-3">
          Back to Users
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button
        as={Link}
        to="/users"
        variant="light"
        className="mb-4 rounded-3 border d-inline-flex align-items-center gap-2 fw-semibold"
      >
        <FaArrowLeft /> Back to Users
      </Button>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 text-center p-4">
            <Card.Body className="d-flex flex-column align-items-center">
              <Image
                src={user.image}
                roundedCircle
                className="mb-3 border border-3 border-primary shadow-sm"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h4 className="fw-bold mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-muted small mb-2">@{user.username}</p>
              <Badge bg="primary" className="px-3 py-2 rounded-pill fw-normal mb-3">
                {user.role || "User"}
              </Badge>

              <div className="w-100 border-top pt-3 text-start small">
                <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                  <FaEnvelope className="text-primary" />
                  <span className="text-truncate">{user.email}</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-muted">
                  <FaPhone className="text-primary" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Row className="g-4">
            <Col md={12}>
              <Card className="border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3 text-primary">Personal Information</h5>
                <Row className="g-3">
                  <Col sm={6} md={3}>
                    <small className="text-muted d-block">Age</small>
                    <span className="fw-semibold">{user.age} yrs</span>
                  </Col>
                  <Col sm={6} md={3}>
                    <small className="text-muted d-block">Gender</small>
                    <span className="fw-semibold text-capitalize">{user.gender}</span>
                  </Col>
                  <Col sm={6} md={3}>
                    <small className="text-muted d-block">Birth Date</small>
                    <span className="fw-semibold">{user.birthDate}</span>
                  </Col>
                  <Col sm={6} md={3}>
                    <small className="text-muted d-block">Blood Group</small>
                    <span className="fw-semibold">{user.bloodGroup}</span>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={12}>
              <Card className="border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3 text-primary d-flex align-items-center gap-2">
                  <FaBriefcase /> Company & Role
                </h5>
                <Row className="g-3">
                  <Col sm={6}>
                    <small className="text-muted d-block">Company</small>
                    <span className="fw-semibold">{user.company?.name || "N/A"}</span>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted d-block">Title</small>
                    <span className="fw-semibold">{user.company?.title || "N/A"}</span>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted d-block">Department</small>
                    <span className="fw-semibold">{user.company?.department || "N/A"}</span>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={12}>
              <Card className="border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3 text-primary d-flex align-items-center gap-2">
                  <FaMapMarkerAlt /> Address
                </h5>
                <Row className="g-3">
                  <Col sm={12}>
                    <small className="text-muted d-block">Street</small>
                    <span className="fw-semibold">{user.address?.address || "N/A"}</span>
                  </Col>
                  <Col sm={4}>
                    <small className="text-muted d-block">City</small>
                    <span className="fw-semibold">{user.address?.city || "N/A"}</span>
                  </Col>
                  <Col sm={4}>
                    <small className="text-muted d-block">State</small>
                    <span className="fw-semibold">{user.address?.state || "N/A"}</span>
                  </Col>
                  <Col sm={4}>
                    <small className="text-muted d-block">Postal Code</small>
                    <span className="fw-semibold">{user.address?.postalCode || "N/A"}</span>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}