import React, { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";

export default function Register() {
  const fullNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { handleRegister } = useContext(UserContext);
  const go = useNavigate();

  function handleSubmit(event) {
    if (event) event.preventDefault();

    const fullName = fullNameRef.current.value;
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!fullName || !userName || !email || !password || !confirmPassword) {
      return toast.error("Fill required fields!");
    }
    if (password !== confirmPassword) {
      return toast.error("Make sure it's the same password!");
    }

    handleRegister({ fullName, userName, email, password });
    toast.success("Registered successfully");
    go("/login");
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 border-0 shadow-sm rounded-4">
            
            <Row className="text-center mb-4">
              <Col>
                <h2 className="fw-bold">Create Account</h2>
                <p className="text-muted small">
                  Join ShopStream for a personalized shopping experience.
                </p>
              </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
              <Row>
                
                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ben Affleck"
                      ref={fullNameRef}
                      className="py-2"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="benaffleck"
                      ref={userNameRef}
                      className="py-2"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-medium">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ben@example.com"
                      ref={emailRef}
                      className="py-2"
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-medium">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      ref={passwordRef}
                      className="py-2"
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-medium">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      ref={confirmPasswordRef}
                      className="py-2"
                    />
                  </Form.Group>
                </Col>

                {/* Checkbox */}
                <Col md={12} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="terms-checkbox"
                    label={
                      <span>
                        I agree to the <a href="">Terms of Service</a> and
                        <a href="">Privacy Policy</a>.
                      </span>
                    }
                  />
                </Col>

                <Col md={12} className="mt-2">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 fw-bold"
                    style={{ backgroundColor: "#3b30db", borderColor: "#3b30db" }}
                  >
                    Sign Up &rarr;
                  </Button>
                </Col>

              </Row>
            </Form>

            <Row className="align-items-center my-4">
              <Col><hr /></Col>
              <Col className="text-center text-muted" md="auto">
                Or register with
              </Col>
              <Col><hr /></Col>
            </Row>
            <Row className="g-2">
              <Col md={6}>
                <Button variant="outline-secondary" className="w-100 py-2 small fw-medium">
                  Google
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-secondary" className="w-100 py-2 small fw-medium">
                  Apple
                </Button>
              </Col>
            </Row>
            <Row className="text-center mt-4">
              <Col className="small text-muted">
                Already have an account?{" "}
                <Link to="/" className="text-primary text-decoration-none fw-bold">
                  Sign In
                </Link>
              </Col>
            </Row>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}