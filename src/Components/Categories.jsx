import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Pagination, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API } from "../api/apiServices"
import Errorhandling from "../utlis/Errorhandling"
import { addToCart } from "../store/slices/cartSlice"
import Loading from "./Loading"
import { MdAddShoppingCart } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  const limit = 12;
  const [skip, setSkip] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await API.get("/products/categories");
        const categoryData = response.data.map((cat) =>
          typeof cat === "object" ? cat.slug : cat
        );
        setCategories(categoryData);
        if (categoryData.length > 0) {
          setSelectedCategory(categoryData[0]);
        }
      } catch (error) {
        Errorhandling(error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    async function fetchCategoryProducts() {
      try {
        setLoading(true);
        const response = await API.get(
          `/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`
        );

        let fetchedProducts = response.data.products || [];

        if (sortBy === "low-high") {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "high-low") {
          fetchedProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
          fetchedProducts.sort((a, b) => b.rating - a.rating);
        }

        setProducts(fetchedProducts);
        setTotalProducts(response.data.total || 0);
      } catch (error) {
        Errorhandling(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryProducts();
  }, [selectedCategory, skip, sortBy]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSkip(0);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSkip((page - 1) * limit);
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <Container className="my-4">
      {/* Breadcrumb Navigation */}
      <nav className="mb-4 small text-secondary">
        <Link to="/" className="text-decoration-none text-muted">
          Home
        </Link>
        {" / "}
        <span className="text-muted">Categories</span>
        {selectedCategory && (
          <>
            {" / "}
            <span className="fw-semibold text-capitalize text-dark">
              {selectedCategory.replace("-", " ")}
            </span>
          </>
        )}
      </nav>

      <Row className="g-4">
        <Col md={3}>
          <div className="border rounded-4 p-3 bg-white shadow-sm">
            <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
              <BiCategory size={22} className="text-primary" />
              <h5 className="fw-bold mb-0">Categories</h5>
            </div>

            <div
              className="d-flex flex-column gap-1 overflow-auto"
              style={{ maxHeight: "650px" }}
            >
              {categories.map((cat) => {
                const isActive = cat === selectedCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`btn text-start text-capitalize py-2 px-3 rounded-3 border-0 transition-all ${
                      isActive
                        ? "bg-primary text-white fw-bold shadow-sm"
                        : "btn-light text-dark hover-bg-light"
                    }`}
                  >
                    {cat.replace("-", " ")}
                  </button>
                );
              })}
            </div>
          </div>
        </Col>

        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-3 rounded-4 border shadow-sm">
            <div>
              <h4 className="fw-bold m-0 text-capitalize">
                {selectedCategory ? selectedCategory.replace("-", " ") : "Category"}
              </h4>
              <small className="text-muted">
                Showing {totalProducts > 0 ? skip + 1 : 0}-
                {Math.min(skip + limit, totalProducts)} of {totalProducts} items
              </small>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="text-muted fw-bold text-nowrap small">Sort by:</span>
              <Form.Select
                size="sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="">Default</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </Form.Select>
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 border">
              <h5>No products found in this category.</h5>
            </div>
          ) : (
            <Row className="g-3">
              {products.map((product) => (
                <Col sm={6} lg={4} key={product.id}>
                  <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <Card.Img
                      variant="top"
                      src={product.thumbnail}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <Card.Title className="fs-6 fw-bold mb-0 text-truncate">
                          {product.title}
                        </Card.Title>
                        {product.rating && (
                          <Badge bg="light" className="text-dark border ms-1">
                            ★ {product.rating}
                          </Badge>
                        )}
                      </div>

                      <Card.Text className="text-muted small text-truncate mb-2">
                        {product.description}
                      </Card.Text>

                      <Card.Text className="fw-bold text-primary fs-5 mt-auto mb-2">
                        ${product.price}
                      </Card.Text>
                    </Card.Body>

                    <Card.Footer className="bg-white border-top-0 pt-0 d-flex gap-2 pb-3 px-3">
                      <Button
                        as={Link}
                        to={`/product-details/${product.id}`}
                        variant="outline-secondary"
                        size="sm"
                        className="w-50 rounded-3 fw-semibold"
                      >
                        Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-50 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-1"
                        disabled={product.stock === 0}
                        onClick={() => dispatch(addToCart(product))}
                        style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
                      >
                        <MdAddShoppingCart size={16} />
                        Add
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          {!loading && totalPages > 1 && (
            <Pagination className="my-4 d-flex justify-content-center gap-1 flex-wrap">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {Array.from({ length: totalPages }).map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
}