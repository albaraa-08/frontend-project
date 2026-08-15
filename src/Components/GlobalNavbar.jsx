import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar, Form, Spinner, ListGroup, Image } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { API } from "../api/apiServices";

export default function GlobalNavbar() {
  const user = useSelector((state) => state.user?.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  // 1. Live Fetch Matching Products as User Types (with 300ms Debounce)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      setShowDropdown(true);

      try {
        const response = await API.get(`/products/search?q=${searchTerm}`);
        setResults(response.data.products || []);
      } catch (error) {
        console.error("Failed to search products:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. Close Dropdown When Clicking Outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Handle Select Product from Search Results
  const handleSelectProduct = (productId) => {
    setShowDropdown(false);
    setSearchTerm("");
    navigate(`/product-details/${productId}`);
  };

  // 4. Handle Pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim()) {
        setShowDropdown(false);
        navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  return (
    <Navbar expand="lg" className="bg-white border-bottom py-2 shadow-sm sticky-top">
      <Container fluid className="px-lg-5">
        {/* Brand Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold me-4"
          style={{ color: "#4318FF", fontSize: "1.3rem" }}
        >
          ShopStream
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center gap-3">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={({ isActive }) =>
                `fw-semibold px-1 py-2 text-decoration-none transition-all ${
                  isActive
                    ? "text-primary border-bottom border-2 border-primary"
                    : "text-secondary"
                }`
              }
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/products"
              className={({ isActive }) =>
                `fw-semibold px-1 py-2 text-decoration-none transition-all ${
                  isActive
                    ? "text-primary border-bottom border-2 border-primary"
                    : "text-secondary"
                }`
              }
            >
              Products
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/categories"
              className={({ isActive }) =>
                `fw-semibold px-1 py-2 text-decoration-none transition-all ${
                  isActive
                    ? "text-primary border-bottom border-2 border-primary"
                    : "text-secondary"
                }`
              }
            >
              Categories
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <div className="position-relative" ref={searchContainerRef}>
              <div
                className="d-flex align-items-center rounded-pill px-3 py-1 border"
                style={{ backgroundColor: "#f0f4ff", minWidth: "280px" }}
              >
                <CiSearch className="text-muted fs-5 me-2" />
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchTerm.trim() && setShowDropdown(true)}
                  className="bg-transparent border-0 shadow-none p-0"
                  style={{ fontSize: "0.875rem" }}
                />
                {loading && <Spinner animation="border" size="sm" variant="primary" />}
              </div>

              {showDropdown && (
                <div
                  className="position-absolute start-0 end-0 mt-2 bg-white rounded-3 shadow-lg border overflow-hidden"
                  style={{ zIndex: 1050, maxHeight: "350px", overflowY: "auto" }}
                >
                  {loading ? (
                    <div className="p-3 text-center text-muted small">Searching...</div>
                  ) : results.length > 0 ? (
                    <ListGroup variant="flush">
                      {results.map((product) => (
                        <ListGroup.Item
                          key={product.id}
                          action
                          onClick={() => handleSelectProduct(product.id)}
                          className="d-flex align-items-center gap-3 p-2 border-0"
                          style={{ cursor: "pointer" }}
                        >
                          <Image
                            src={product.thumbnail || product.image}
                            alt={product.title}
                            rounded
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                          />
                          <div className="d-flex flex-column text-truncate flex-grow-1">
                            <span className="fw-semibold text-dark small text-truncate">
                              {product.title}
                            </span>
                            <span className="text-muted extra-small" style={{ fontSize: "0.75rem" }}>
                              {product.category}
                            </span>
                          </div>
                          <span className="fw-bold text-primary small">
                            ${product.price}
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <div className="p-3 text-center text-muted small">
                      No products found for "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <Nav.Link as={Link} to="/cart" className="fs-5 text-dark px-1">
              <MdOutlineShoppingCart />
            </Nav.Link>

            <Nav.Link
              as={Link}
              to={user ? "/profile" : "/login"}
              className="fs-5 text-dark px-1"
            >
              <CgProfile />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}