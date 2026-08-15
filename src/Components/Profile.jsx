import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/userSlice";
import { API } from "../api/apiServices";
import Errorhandling from "../utlis/Errorhandling";
import toast from "react-hot-toast";

import { CgProfile } from "react-icons/cg";
import { FaHistory, FaRegStar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineShoppingBag, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { VscSignOut } from "react-icons/vsc";
import profilepic from "../assets/profilepic.jpg";

import EditUserModal from "./users/EditUserModal";

export default function Profile() {
  const [profileUser, setProfileUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "Customer",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user?.user);

  useEffect(() => {
    async function fetchAuthUserAndOrders() {
      try {
        setLoading(true);
        
        const localSavedUser = localStorage.getItem("profileUser");
        if (localSavedUser) {
          setProfileUser(JSON.parse(localSavedUser));
        } else {
          const token = localStorage.getItem("token") || reduxUser?.accessToken || reduxUser?.token;
          if (token) {
            const userRes = await API.get("/auth/me", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setProfileUser(userRes.data);
          } else if (reduxUser) {
            setProfileUser(reduxUser);
          }
        }

        const productRes = await API.get("/products?limit=3");
        const fetchedOrders = (productRes.data.products || []).map((product, index) => {
          const statuses = ["Delivered", "Shipped", "Processing"];
          const badgeStyles = [
            { bg: "#d1fae5", text: "#059669" },
            { bg: "#4f46e5", text: "#ffffff" },
            { bg: "#e2e8f0", text: "#475569" },
          ];
          const actionLabels = ["Track Package", "Track Package", "Edit Order"];

          return {
            id: `SS-${product.id}00${index + 1}`,
            title: product.title,
            date: `Oct ${12 + index * 3}, 2023`,
            price: `$${product.price.toFixed(2)}`,
            status: statuses[index],
            badgeStyle: badgeStyles[index],
            actionText: actionLabels[index],
            image: product.thumbnail,
          };
        });

        setOrders(fetchedOrders);
      } catch (err) {
        Errorhandling(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthUserAndOrders();
  }, [reduxUser]);

  const activeUser = profileUser || reduxUser || {};

  const handleOpenEditModal = () => {
    const currentName = activeUser.firstName 
      ? `${activeUser.firstName} ${activeUser.lastName || ""}`.trim()
      : activeUser.username || "";

    setFormData({
      fullName: currentName,
      username: activeUser.username || "",
      email: activeUser.email || "",
      role: activeUser.role || "Customer",
      password: "",
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const updatedUserData = {
      ...activeUser,
      firstName,
      lastName,
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };
    setProfileUser(updatedUserData);
    localStorage.setItem("profileUser", JSON.stringify(updatedUserData));

    toast.success("Profile updated successfully!");
    handleCloseEditModal();
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("profileUser");
    if (dispatch && logout) dispatch(logout());
    toast.success("Signed out successfully");
    navigate("/login");
  };
  if (loading) {
    return (
      <Container className="text-center py-5 min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }
  const displayName = activeUser.firstName 
    ? `${activeUser.firstName} ${activeUser.lastName}` 
    : activeUser.username || "User Profile";

  return (
    <Container fluid className="bg-light min-vh-100 py-4 px-3 px-lg-5">
      <Row className="g-4">
        <Col lg={3}>
          <Card className="border-0 shadow-sm p-3 rounded-4">
            <h5 className="fw-bold mb-1 text-primary px-2">Account</h5>
            <small className="text-muted mb-4 px-2 d-block">Manage your settings</small>

            <ListGroup variant="flush" className="gap-2 border-0">
              <ListGroup.Item 
                action 
                className="rounded-3 border-0 active d-flex align-items-center gap-3 py-2 px-3 fw-medium"
              >
                <CgProfile />
                My Profile
              </ListGroup.Item>
              
              <ListGroup.Item 
                action 
                className="rounded-3 border-0 text-secondary d-flex align-items-center gap-3 py-2 px-3 fw-medium"
              >
                <FaHistory />
                Order History
              </ListGroup.Item>

              <ListGroup.Item 
                action 
                className="rounded-3 border-0 text-secondary d-flex align-items-center gap-3 py-2 px-3 fw-medium"
              >
                <IoMdSettings />
                Account Settings
              </ListGroup.Item>
            </ListGroup>

            <hr className="my-4 text-muted" />

            <Button 
              variant="link" 
              onClick={handleSignOut}
              className="text-danger border-0 d-flex align-items-center gap-2 p-2 fw-semibold text-decoration-none"
            >
              <VscSignOut />
              Sign Out
            </Button>
          </Card>
        </Col>

        <Col lg={9}>
          <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
            <Row className="align-items-center g-3">
              <Col xs="auto" className="position-relative">
                <Image 
                  src={activeUser.image || profilepic} 
                  roundedCircle 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
                <span 
                  className="position-absolute bottom-0 end-0 rounded-circle bg-primary text-white border border-2 border-white p-1 shadow-sm d-flex align-items-center justify-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenEditModal}
                >
                  <LuPencil size={14} />
                </span>
              </Col>
              <Col>
                <h3 className="fw-bold mb-1">{displayName}</h3>
                <p className="text-muted mb-2 small">{activeUser.email || "user@example.com"}</p>
                <span style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)', color: '#198754', padding: '6px 12px', borderRadius: '50px', fontSize: '0.85rem' }} className="me-2">
                  {activeUser.role ? `Role: ${activeUser.role}` : "Premium Member"}
                </span>
                <span style={{ backgroundColor: 'rgba(108, 117, 125, 0.1)', color: '#212529', padding: '6px 12px', borderRadius: '50px', fontSize: '0.85rem' }}>
                  Member since 2023
                </span>
              </Col>
              <Col md="auto" className="d-flex flex-column gap-2 mt-3 mt-md-0">
                <Button 
                  variant="primary" 
                  className="fw-semibold px-4 py-2 border-0"
                  onClick={handleOpenEditModal}
                >
                  Edit Profile
                </Button>
                <Button variant="outline-primary" className="fw-semibold px-4 py-2"
                variant="outline-primary" 
                className="fw-bold px-4 py-2"
                onClick={()=> navigate("/inventory")}>
                  Admin Dashboard
                </Button>
              </Col>
            </Row>
          </Card>

          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary d-inline-flex">
                    <MdOutlineShoppingBag size={20} />
                  </span>
                  <span className="text-success small fw-semibold">+2 this month</span>
                </div>
                <small className="text-muted fw-semibold">Total Orders</small>
                <h3 className="fw-bold m-0 mt-1">24</h3>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
                <span className="p-2 rounded-3 bg-success bg-opacity-10 text-success mb-3 d-inline-flex align-self-start">
                  <MdOutlineAccountBalanceWallet size={20} />
                </span>
                <small className="text-muted fw-semibold">Wallet Balance</small>
                <h3 className="fw-bold m-0 mt-1">$1,248.50</h3>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
                <span className="p-2 rounded-3 bg-warning bg-opacity-10 text-warning mb-3 d-inline-flex align-self-start">
                  <FaRegStar size={20} />
                </span>
                <small className="text-muted fw-semibold">Loyalty Points</small>
                <h3 className="fw-bold m-0 mt-1">4,567</h3>
              </Card>
            </Col>
          </Row>

          <Card className="border border-1 rounded-4 overflow-hidden shadow-sm">
            <Card.Header 
              className="p-3 px-4 border-bottom d-flex justify-content-between align-items-center"
              style={{ backgroundColor: '#f0f4ff' }}
            >
              <h5 className="fw-bold m-0 text-dark">Recent Orders</h5>
              
            </Card.Header>

            <ListGroup variant="flush">
              {orders.map((order) => (
                <ListGroup.Item key={order.id} className="p-3 px-4">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <Image 
                        src={order.image} 
                        rounded="3" 
                        style={{ width: '64px', height: '64px', objectFit: 'cover' }} 
                      />
                      <div className="d-flex flex-column">
                        <h6 className="fw-bold mb-1 text-dark">{order.title}</h6>
                        <div className="text-muted small">
                          <span className="me-3">Order #{order.id}</span>
                          <span>Placed on {order.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-4">
                      <h5 className="fw-bold m-0" style={{ color: '#312e81' }}>{order.price}</h5>
                      
                      <div className="d-flex flex-column align-items-end gap-1" style={{ minWidth: '110px' }}>
                        <span 
                          style={{ 
                            backgroundColor: order.badgeStyle.bg, 
                            color: order.badgeStyle.text,
                            borderRadius: '50px',
                            padding: '4px 12px',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            display: 'inline-block',
                            textAlign: 'center'
                          }}
                        >
                          {order.status}
                        </span>
                        <span 
                          className="small fw-bold text-primary" 
                          style={{ cursor: 'pointer' }}
                        >
                          {order.actionText}
                        </span>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <EditUserModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleUpdateUser={handleUpdateUser}
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </Container>
  );
}