import React, { useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import Errorhandling from "../utlis/Errorhandling";
import { API } from "../api/apiServices";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const go = useNavigate();

  async function handelLogin(event) {
    event.preventDefault();

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !password) {
      return toast.error("Please enter both username and password!");
    }

    const data = { username, password };

    try {
      const response = await API.post("/auth/login", data);

      // data (username and password are sent to dummy json for verification then dummyjson returns with the data i want 
      // which i then store in the variable called response and access this data by response.data)

      // Save user details & auth token
      dispatch(login(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.accessToken || response.data.token);

      toast.success("Login Success");
      go("/home");
    } catch (error) {
      Errorhandling(error);
    }
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 border-0 shadow-sm rounded-4">
            <Row className="text-center mb-4">
              <Col>
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-center text-muted">
                  Please enter your details to sign in.
                </p>
              </Col>
            </Row>

            <Form onSubmit={handelLogin}>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="admin = emilys"
                      ref={usernameRef}
                      className="py-2"
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Row className="align-items-center mb-1">
                      <Col>
                        <Form.Label className="fw-bold small m-0">
                          Password
                        </Form.Label>
                      </Col>
                      <Col className="text-end">
                        <a
                          href="#forgot"
                          className="small text-primary text-decoration-none"
                        >
                          Forgot?
                        </a>
                      </Col>
                    </Row>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      ref={passwordRef}
                      className="py-2"
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="stay-signed-in"
                    label="Stay signed in for 30 days"
                  />
                </Col>

                <Col md={12} className="mt-2">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 fw-bold"
                    style={{
                      backgroundColor: "#3b30db",
                      borderColor: "#3b30db",
                    }}
                  >
                    Sign In <FaLongArrowAltRight />
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row className="align-items-center my-4">
              <Col>
                <hr />
              </Col>
              <Col className="text-center" md="auto">
                Or continue with
              </Col>
              <Col>
                <hr />
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={6}>
                <Button variant="outline-secondary" className="w-100 py-2">
                  Google
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-secondary" className="w-100 py-2">
                  Apple
                </Button>
              </Col>
            </Row>

            <Row className="text-center mt-4">
              <Col className="small">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary text-decoration-none fw-bold"
                >
                  Register
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}