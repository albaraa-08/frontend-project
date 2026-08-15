import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Errorhandling from "../../utlis/Errorhandling";
import { addToCart } from "../../store/slices/cartSlice";
import { API } from "../../api/apiServices";
import Loading from "../Loading";
import { MdAddShoppingCart } from "react-icons/md";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);

  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const limit = 20;
  const [skip, setSkip] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSkip((page - 1) * limit);
  };

  useEffect(() => {
    if (searchParam) {
      setSearchItem(searchParam);
      setSelectedCategories([]);
    } else if (categoryParam) {
      setSelectedCategories([categoryParam]);
      setSearchItem("");
    }
  }, [categoryParam, searchParam]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await API.get("/products/categories");
        const categoryData = response.data.map((cat) =>
          typeof cat === "object" ? cat.slug : cat
        );
        setCategories(categoryData);
      } catch (error) {
        Errorhandling(error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        let endpoint = `/products/search?q=${searchItem}&limit=${limit}&skip=${skip}`;

        if (selectedCategories.length > 0 && !searchItem) {
          endpoint = `/products/category/${selectedCategories[0]}?limit=${limit}&skip=${skip}`;
        }

        const response = await API.get(endpoint);
        let fetchedProducts = response.data.products || [];

        if (minRating) {
          fetchedProducts = fetchedProducts.filter(
            (p) => p.rating >= parseFloat(minRating)
          );
        }

        if (sortBy === "low-high") {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "high-low") {
          fetchedProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
          fetchedProducts.sort((a, b) => b.rating - a.rating);
        }

        setProducts(fetchedProducts);
        setTotalProducts(response.data.total || 0);
        setTotalPages(Math.ceil((response.data.total || 0) / limit));
      } catch (error) {
        Errorhandling(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [searchItem, selectedCategories, minRating, sortBy, skip]);

  const handleCategoryToggle = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== cat));
    } else {
      setSelectedCategories([cat]);
    }
    setSearchItem("");
    handlePageChange(1);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinRating("");
    setSortBy("");
    setSearchItem("");
    handlePageChange(1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="my-3">
      <Row className="g-4">
        <Col md={3}>
          <div className="border p-3 rounded bg-white shadow-sm">
            <h6 className="fw-bold text-uppercase text-secondary mb-3">
              Category
            </h6>
            <div className="d-flex flex-column gap-2 mb-4">
              {categories.map((cat) => (
                <Form.Check
                  key={cat}
                  type="checkbox"
                  id={`cat-${cat}`}
                  label={cat.replace("-", " ")}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="text-capitalize fw-medium"
                />
              ))}
            </div>

            <h6 className="fw-bold text-uppercase text-secondary mb-2">
              Rating
            </h6>
            <Form.Select
              size="sm"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="mb-4"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5 & Up</option>
              <option value="4.0">4.0 & Up</option>
              <option value="3.5">3.5 & Up</option>
              <option value="3.0">3.0 & Up</option>
            </Form.Select>
            <Button
              variant="light"
              className="w-100 py-2 fw-bold rounded-3 border-0"
              style={{ backgroundColor: "#eef2ff", color: "#4f46e5" }}
              onClick={handleClearFilters}
              disabled={selectedCategories.length === 0 && !minRating && !sortBy && !searchItem}
            >
              Clear Filters
            </Button>
          </div>
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-bold m-0 text-capitalize">
                {searchItem ? `Search: "${searchItem}"` : "All Products"}
              </h4>
              <small className="text-muted">
                Showing {totalProducts > 0 ? skip + 1 : 0}-
                {Math.min(skip + limit, totalProducts)} of {totalProducts} results
              </small>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="text-muted fw-bold text-nowrap">Sort by:</span>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="">Newest Arrivals</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </Form.Select>
            </div>
          </div>

          <Row className="g-3">
            {products.length === 0 ? (
              <Col xs={12} className="text-center py-5">
                <h5>No products found.</h5>
              </Col>
            ) : (
              products.map((product) => (
                <Col md={6} lg={4} key={product.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={product.thumbnail}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start">
                        <Card.Title>{product.title}</Card.Title>
                        {product.rating && (
                          <span className="badge bg-light text-dark border">
                            ★ {product.rating}
                          </span>
                        )}
                      </div>
                      <Card.Text className="text-truncate">
                        {product.description}
                      </Card.Text>
                      <Card.Text className="fw-bold text-success mt-auto fs-5">
                        ${product.price}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between gap-1">
                      <Button
                        as={Link}
                        to={`/product-details/${product.id}`}
                        variant="outline-primary"
                        size="sm"
                      >
                        Show Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={product.stock === 0}
                        onClick={() => dispatch(addToCart(product))}
                      >
                        <MdAddShoppingCart size={20} />
                        {product.stock === 0 ? "Out of stock" : "Add to Cart"}
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            )}
          </Row>

          {totalPages > 1 && (
            <Pagination className="my-4 d-flex justify-content-center gap-1 flex-wrap">
              {currentPage !== 1 && (
                <Pagination.First onClick={() => handlePageChange(1)} />
              )}

              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />

              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item
                  active={index + 1 === currentPage}
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />

              {currentPage !== totalPages && (
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
              )}
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
}