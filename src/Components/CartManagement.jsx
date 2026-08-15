import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  InputGroup,
  Button,
  Badge,
  Spinner,
  Image,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  BsSearch,
  BsFilter,
  BsCartCheck,
  BsWallet2,
  BsStopwatch,
  BsCartX,
  BsDownload,
  BsThreeDotsVertical,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

import { API } from "../api/apiServices";
import Errorhandling from "../utlis/Errorhandling";
import StatCard from "./StatCard";
import Sidebar from "./Sidebar";

export default function CartManagement() {
  const STORAGE_KEY = "users";
  const { items, totalAmount } = useSelector((state) => state.cart);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [skip, setSkip] = useState(0);

  const limit = 10;
  const activeItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const savedUsers = localStorage.getItem(STORAGE_KEY);
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        } else {
          const response = await API.get("/users?limit=100");
          setUsers(response.data.users);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.users));
        }
      } catch (error) {
        Errorhandling(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const allCarts = users.map((u) => {
    const statuses = ["Completed", "Pending", "Abandoned", "Active"];
    const status = statuses[u.id % statuses.length];
    const statusStyles = {
      Completed: { bg: "#E6F4EA", color: "#16A34A", dot: "#16A34A" },
      Pending: { bg: "#FEF3C7", color: "#D97706", dot: "#D97706" },
      Abandoned: { bg: "#FEE2E2", color: "#DC2626", dot: "#DC2626" },
      Active: { bg: "#E0E7FF", color: "#3730A3", dot: "#4318FF" },
    };

    const itemCount = ((u.id * 3) % 12) + 1;
    const priceVal = (u.id * 42.5 + 15.0).toFixed(2);

    return {
      cartId: `#CRT-${88200 + u.id}`,
      userId: `USR-${u.id}`,
      rawUserId: u.id,
      user: `${u.firstName} ${u.lastName}`,
      email: u.email,
      image: u.image || "https://dummyjson.com/icon/user/128",
      totalItems: `${itemCount} item${itemCount > 1 ? "s" : ""}`,
      price: `$${priceVal}`,
      rawPrice: parseFloat(priceVal),
      status: status,
      statusStyle: statusStyles[status],
      isLive: false,
    };
  });

  if (items.length > 0) {
    allCarts.unshift({
      cartId: "#CRT-88999",
      userId: "USR-00",
      rawUserId: 0,
      user: "Active Session (You)",
      email: "current.session@app.com",
      image: "https://dummyjson.com/icon/user/128",
      totalItems: `${activeItemsCount} item${activeItemsCount > 1 ? "s" : ""}`,
      price: `$${totalAmount.toFixed(2)}`,
      rawPrice: totalAmount,
      status: "Active Now",
      statusStyle: { bg: "#E0E7FF", color: "#3730A3", dot: "#4318FF" },
      isLive: true,
    });
  }

  const filteredCarts = allCarts.filter((cart) => {
    const query = searchTerm.toLowerCase().trim().replace("#", "");
    const cleanCartId = cart.cartId.toLowerCase().replace("#", "");
    const cleanUserId = cart.userId.toLowerCase();
    const rawUserIdStr = String(cart.rawUserId);
    const userName = cart.user.toLowerCase();
    const email = cart.email.toLowerCase();

    return (
      cleanCartId.includes(query) ||
      cleanUserId.includes(query) ||
      rawUserIdStr.includes(query) ||
      userName.includes(query) ||
      email.includes(query)
    );
  });

  const total = filteredCarts.length;
  const paginatedCarts = filteredCarts.slice(skip, skip + limit);
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSkip(0);
  };

  const activeCount = allCarts.filter((c) => c.status.includes("Active")).length;
  const totalRevenue = allCarts.reduce((sum, c) => sum + c.rawPrice, 0);
  const abandonCount = allCarts.filter((c) => c.status === "Abandoned").length;
  const abandonRate = total > 0 ? ((abandonCount / allCarts.length) * 100).toFixed(1) : 0;

  return (
    <div className="d-flex" style={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Container fluid>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h2 className="fw-bold text-dark mb-1">Cart Management</h2>
              <p className="text-muted small mb-0">
                Oversee and monitor all customer shopping activity.
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <InputGroup style={{ minWidth: "320px" }}>
                <InputGroup.Text className="bg-white border-end-0 text-muted pe-1 rounded-start-3">
                  <BsSearch size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by User ID, Cart ID, Name or Email..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border-start-0 bg-white shadow-none rounded-end-3 py-2 small"
                />
              </InputGroup>

              <Button
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-semibold text-white border-0"
                style={{ backgroundColor: "#3B1DE2" }}
              >
                <BsFilter size={16} />
                Filter
              </Button>
            </div>
          </div>
          <Row className="g-3 mb-4">
            <Col xs={12} sm={6} lg={3}>
              <StatCard
                title="ACTIVE CARTS"
                value={activeCount.toLocaleString()}
                bgColor="#EEF2FF"
                iconColor="#4318FF"
                icon={<BsCartCheck size={22} />}
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <StatCard
                title="POTENTIAL REV"
                value={`$${totalRevenue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                bgColor="#E6F4EA"
                iconColor="#10B981"
                icon={<BsWallet2 size={22} />}
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <StatCard
                title="AVG. SESSION"
                value="14m 32s"
                bgColor="#EFF6FF"
                iconColor="#3B82F6"
                icon={<BsStopwatch size={22} />}
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <StatCard
                title="ABANDON RATE"
                value={`${abandonRate}%`}
                bgColor="#FEE2E2"
                iconColor="#EF4444"
                icon={<BsCartX size={22} />}
              />
            </Col>
          </Row>

          <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom px-4">
              <div className="d-flex align-items-center gap-2">
                <h5 className="fw-bold text-dark mb-0 fs-6">Recent Cart Activity</h5>
                <Badge bg="secondary" pill className="px-2 py-1 small">
                  {total} Carts Found
                </Badge>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted">
                <Button variant="link" className="text-muted p-1 text-decoration-none">
                  <BsDownload size={16} />
                </Button>
                <Button variant="link" className="text-muted p-1 text-decoration-none">
                  <BsThreeDotsVertical size={16} />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="bg-light">
                    <tr style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold border-0">
                        CART ID
                      </th>
                      <th className="py-3 text-muted text-uppercase fw-bold border-0">
                        USER & ID
                      </th>
                      <th className="py-3 text-muted text-uppercase fw-bold border-0">
                        TOTAL ITEMS
                      </th>
                      <th className="py-3 text-muted text-uppercase fw-bold border-0">
                        TOTAL PRICE
                      </th>
                      <th className="py-3 text-muted text-uppercase fw-bold border-0">
                        STATUS
                      </th>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold border-0 text-end">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCarts.length > 0 ? (
                      paginatedCarts.map((row, index) => (
                        <tr key={index} className={row.isLive ? "bg-light-subtle" : ""}>
                          <td className="py-3 px-4">
                            <span
                              className="fw-bold"
                              style={{ color: "#3B1DE2", fontSize: "0.875rem" }}
                            >
                              {row.cartId}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center gap-3">
                              <Image
                                src={row.image}
                                roundedCircle
                                style={{
                                  width: "38px",
                                  height: "38px",
                                  objectFit: "cover",
                                }}
                                className="bg-light border"
                              />
                              <div>
                                <div className="d-flex align-items-center gap-2">
                                  <span className="fw-bold text-dark" style={{ fontSize: "0.875rem" }}>
                                    {row.user}
                                  </span>
                                  <Badge bg="light" text="dark" className="border small">
                                    {row.userId}
                                  </Badge>
                                </div>
                                <div className="text-muted" style={{ fontSize: "0.775rem" }}>
                                  {row.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-secondary" style={{ fontSize: "0.875rem" }}>
                            {row.totalItems}
                          </td>
                          <td className="py-3">
                            <span className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
                              {row.price}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill fw-semibold"
                              style={{
                                backgroundColor: row.statusStyle.bg,
                                color: row.statusStyle.color,
                                fontSize: "0.775rem",
                              }}
                            >
                              <span
                                className="rounded-circle"
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  backgroundColor: row.statusStyle.dot,
                                }}
                              />
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-end">
                            <Button variant="link" className="text-muted p-0 text-decoration-none">
                              <BsThreeDotsVertical size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-muted">
                          No users or carts found matching "{searchTerm}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}

            <div
              className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 px-4 border-top"
              style={{ backgroundColor: "#F8FAFC" }}
            >
              <span className="text-muted small mb-2 mb-sm-0">
                Showing {total > 0 ? skip + 1 : 0} to {Math.min(skip + limit, total)} of {total} results
              </span>

              <div className="d-flex align-items-center gap-1">
                <Button
                  variant="light"
                  disabled={skip === 0}
                  onClick={() => setSkip((prev) => Math.max(0, prev - limit))}
                  className="p-2 border rounded-3 bg-white d-flex align-items-center justify-content-center"
                  style={{ width: "32px", height: "32px" }}
                >
                  <BsChevronLeft size={12} />
                </Button>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActivePage = pageNum === currentPage;

                  return (
                    <Button
                      key={pageNum}
                      className="rounded-3 fw-semibold border-0 d-flex align-items-center justify-content-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: isActivePage ? "#3B1DE2" : "#FFFFFF",
                        color: isActivePage ? "#FFFFFF" : "#64748B",
                        fontSize: "0.825rem",
                      }}
                      onClick={() => setSkip((pageNum - 1) * limit)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="light"
                  disabled={skip + limit >= total}
                  onClick={() => setSkip((prev) => prev + limit)}
                  className="p-2 border rounded-3 bg-white d-flex align-items-center justify-content-center"
                  style={{ width: "32px", height: "32px" }}
                >
                  <BsChevronRight size={12} />
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
}