import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../api/apiServices";
import Errorhandling from "../../utlis/Errorhandling";
import { addToCart } from "../../store/slices/cartSlice";
import Loading from "../Loading";
import { BsTruck } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { GiReturnArrow } from "react-icons/gi";
import { IoMdStar } from "react-icons/io";

export default function ProductsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { role, isLoggedin } = useSelector((state) => state.user || {});
  const isAdmin = isLoggedin && role === "admin";

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await API.get(`/products/${id}`);
        const productData = res.data;
        setProduct(productData);

        if (productData?.images?.length > 0) {
          setMainImage(productData.images[0]);
        } else if (productData?.thumbnail) {
          setMainImage(productData.thumbnail);
        }
      } catch (error) {
        Errorhandling(error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <Loading />;

  const {
    images,
    title,
    price,
    rating,
    description,
    category,
    discountPercentage,
    sku,
    stock,
  } = product;

  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "increase" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const renderStars = (score) => {
    const roundedRating = Math.round(score || 0);

    return [1, 2, 3, 4, 5].map((star) => (
      <IoMdStar
        key={star}
        size={18}
        className={star <= roundedRating ? "text-warning" : "text-secondary opacity-25"}
      />
    ));
  };

  return (
    <Container className="my-4">
      <nav className="mb-4 small text-secondary">
        <Link to="/" className="text-decoration-none text-muted">Home</Link>
        {" / "}
        <span className="text-capitalize text-muted">{category}</span>
        {" / "}
        <span className="fw-semibold text-dark">{title}</span>
      </nav>

      <Row className="g-4">
        <Col md={1} className="d-none d-md-block">
          <div className="d-flex flex-column gap-2">
            {images?.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={title}
                width="100%"
                height="70"
                onClick={() => setMainImage(item)}
                style={{
                  cursor: "pointer",
                  objectFit: "cover",
                  border: mainImage === item ? "2px solid #4f46e5" : "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        </Col>

        <Col md={5}>
          <div className="border rounded-4 p-3 bg-white text-center position-relative">
            <img
              src={mainImage}
              alt={title}
              className="img-fluid"
              style={{ maxHeight: "420px", objectFit: "contain" }}
            />
          </div>
        </Col>

        <Col md={6}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Badge bg="success" className="px-2 py-1 fw-normal">
              New Arrival
            </Badge>
            {sku && <span className="text-muted small">SKU: {sku}</span>}
          </div>

          <h2 className="fw-bold mb-2">{title}</h2>

          <div className="d-flex align-items-center gap-1 mb-3">
            <div className="d-flex align-items-center">
              {renderStars(rating)}
            </div>
            <span className="fw-bold text-dark ms-1">{rating}</span>
            <small className="text-muted border-bottom ms-2">Reviews</small>
          </div>

          <div className="d-flex align-items-baseline gap-2 mb-1">
            <h2 className="fw-bold m-0">${price}</h2>
            {originalPrice && (
              <span className="text-muted text-decoration-line-through fs-5">
                ${originalPrice}
              </span>
            )}
            {discountPercentage && (
              <span className="text-success fw-bold">
                ({discountPercentage}% OFF)
              </span>
            )}
          </div>
          <p className="text-muted mb-3">
            Shipping calculated at checkout. Free shipping on orders over $500.
          </p>

          <hr />

          <p className="text-secondary mb-4">{description}</p>

          <div className="mb-4">
            <label className="fw-bold d-block mb-2">Quantity</label>
            <div className="d-flex align-items-center border rounded-3" style={{ width: "fit-content" }}>
              <Button
                variant="light"
                size="sm"
                className="border-0 px-3 bg-transparent"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="px-3 fw-bold">{quantity}</span>
              <Button
                variant="light"
                size="sm"
                className="border-0 px-3 bg-transparent"
                onClick={() => handleQuantityChange("increase")}
                disabled={quantity >= stock}
              >
                +
              </Button>
            </div>
          </div>

          <div className="d-flex gap-2 mb-3">
            <Button
              variant="primary"
              className="w-100 py-2 fw-bold"
              style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
              disabled={stock === 0}
              onClick={handleAddToCart}
            >
              {stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          <Button
            variant="success"
            className="w-100 py-2 fw-bold mb-4"
            disabled={stock === 0}
          >
            Buy Now
          </Button>

          <div className="p-2 border rounded bg-light d-flex gap-2 mb-4">
            <Button
              variant="warning"
              size="sm"
              className="w-50"
              disabled={!isAdmin}
              title={!isAdmin ? "Admin required" : ""}
            >
              Edit Product
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="w-50"
              disabled={!isAdmin}
              title={!isAdmin ? "Admin required" : ""}
            >
              Delete Product
            </Button>
          </div>

          <Row className="g-2 pt-2 border-top text-muted small">
            <Col xs={6} className="d-flex align-items-center gap-2">
              <HiMiniCheckBadge className="fs-5 text-success" />
              <span>2 Year Warranty</span>
            </Col>
            <Col xs={6} className="d-flex align-items-center gap-2">
              <BsTruck className="fs-5 text-success" />
              <span>Fast 2-Day Delivery</span>
            </Col>
            <Col xs={6} className="d-flex align-items-center gap-2">
              <GiReturnArrow className="fs-5 text-success" />
              <span>30-Day Returns</span>
            </Col>
            <Col xs={6} className="d-flex align-items-center gap-2">
              <TfiHeadphoneAlt className="fs-5 text-success" />
              <span>Lifetime Support</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}