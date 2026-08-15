import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API } from "../api/apiServices";
import { addToCart } from "../store/slices/cartSlice";
import Errorhandling from "../utlis/Errorhandling";
import Loading from "./Loading";
import car from "../assets/car.jpg";
import fragrances from "../assets/fragrances.jpg";
import mobile from "../assets/mobile.jpg";
import furniture from "../assets/furniture.jpg";
import headphones from "../assets/headphones.jpg";
import { FaArrowRight } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const res = await API.get("/products?limit=12");
        setFeaturedProducts(res.data.products || []);
      } catch (error) {
        Errorhandling(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-light pb-5">
      <section
        className="py-5 mb-5"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #eef2ff 100%)",
        }}
      >
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <Badge
                bg="success"
                className="px-3 py-2 text-uppercase mb-3 fw-normal"
                style={{ backgroundColor: "#10b981" }}
              >
                New Season Arrival
              </Badge>
              <h1 className="display-4 fw-bold text-dark mb-3">
                Experience the Future of{" "}
                <span style={{ color: "#4f46e5" }}>Innovation.</span>
              </h1>
              <p className="text-secondary fs-5 mb-4">
                Explore our curated selection of premium electronics designed to
                elevate your daily stream of life. Precision engineering meets
                minimalist design.
              </p>
              <div className="d-flex gap-3">
                <Button
                  as={Link}
                  to="/products"
                  className="px-4 py-2 border-0 fw-semibold"
                  style={{ backgroundColor: "#4f46e5" }}
                >
                  Shop Electronics
                </Button>
                <Button
                  as={Link}
                  to="/products"
                  variant="outline-secondary"
                  className="px-4 py-2 bg-white text-dark border fw-semibold"
                >
                  View Collections
                </Button>
              </div>
            </Col>

            <Col lg={6} className="text-center">
              <img
                src={headphones}
                alt="Featured Product"
                className="img-fluid rounded"
                style={{ maxHeight: "380px", objectFit: "contain" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h3 className="fw-bold m-0">Top Categories</h3>
            <small className="text-muted">Curated gear for every lifestyle.</small>
          </div>
          <Link
            to="/products"
            className="text-decoration-none fw-semibold d-flex align-items-center gap-1"
            style={{ color: "#4f46e5" }}
          >
            See All <FaArrowRight />
          </Link>
        </div>

        <Row className="g-3">
          <Col lg={6}>
            <Link
              to="/products?category=vehicle"
              className="text-decoration-none d-block h-100"
            >
              <div
                className="position-relative rounded-4 overflow-hidden shadow-sm h-100"
                style={{ minHeight: "300px", cursor: "pointer" }}
              >
                <img
                  src={car}
                  alt="Vehicle"
                  className="w-100 h-100 position-absolute top-0 start-0"
                  style={{ objectFit: "cover" }}
                />
                <div className="position-relative h-100 d-flex flex-column justify-content-end p-4 text-white">
                  <h4 className="fw-bold mb-1">Vehicle</h4>
                  <p className="small m-0 text-white-50">
                    Drive with speed and comfort.
                  </p>
                </div>
              </div>
            </Link>
          </Col>

          <Col lg={6}>
            <Row className="g-3">
              <Col xs={6}>
                <Link
                  to="/products?category=smartphones"
                  className="text-decoration-none d-block"
                >
                  <div
                    className="position-relative rounded-4 overflow-hidden shadow-sm"
                    style={{ height: "145px", cursor: "pointer" }}
                  >
                    <img
                      src={mobile}
                      alt="Smartphones"
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white fw-semibold">
                      Smartphones
                    </div>
                  </div>
                </Link>
              </Col>

              <Col xs={6}>
                <Link
                  to="/products?category=fragrances"
                  className="text-decoration-none d-block"
                >
                  <div
                    className="position-relative rounded-4 overflow-hidden shadow-sm"
                    style={{ height: "145px", cursor: "pointer" }}
                  >
                    <img
                      src={fragrances}
                      alt="Fragrances"
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white fw-semibold">
                      Fragrances
                    </div>
                  </div>
                </Link>
              </Col>

              <Col xs={12}>
                <Link
                  to="/products?category=furniture"
                  className="text-decoration-none d-block"
                >
                  <div
                    className="position-relative rounded-4 overflow-hidden shadow-sm"
                    style={{ height: "145px", cursor: "pointer" }}
                  >
                    <img
                      src={furniture}
                      alt="Furniture"
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white fw-semibold">
                      Furniture
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h3 className="fw-bold m-0">Featured Products</h3>
            <small className="text-muted">
              The latest and greatest in tech innovation.
            </small>
          </div>
          <div className="d-flex gap-2">
            <Button
              id="swiper-prev-btn"
              variant="light"
              size="sm"
              className="rounded-circle border p-0 d-flex align-items-center justify-content-center"
              style={{ width: "36px", height: "36px" }}
            >
              <FaChevronLeft />
            </Button>
            <Button
              id="swiper-next-btn"
              variant="light"
              size="sm"
              className="rounded-circle border p-0 d-flex align-items-center justify-content-center"
              style={{ width: "36px", height: "36px" }}
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: "#swiper-prev-btn",
            nextEl: "#swiper-next-btn",
          }}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="pb-2"
        >
          {featuredProducts.map((item) => (
            <SwiperSlide key={item.id}>
              <Card className="h-100 border-0 shadow-sm rounded-4 p-2 bg-white">
                <div className="position-relative text-center p-3">
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    style={{ height: "160px", objectFit: "contain" }}
                  />
                </div>

                <Card.Body className="d-flex flex-column justify-content-between pt-0">
                  <div>
                    <span
                      className="text-uppercase fw-bold text-muted d-block mb-1"
                      style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                    >
                      {item.category}
                    </span>
                    <Card.Title
                      as={Link}
                      to={`/product-details/${item.id}`}
                      className="text-decoration-none text-dark fs-6 fw-semibold text-truncate d-block mb-2"
                    >
                      {item.title}
                    </Card.Title>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold text-success fs-6">
                      ${item.price}
                    </span>
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-3 border-0 d-flex align-items-center gap-1"
                      style={{ backgroundColor: "#eef2ff", color: "#4f46e5" }}
                      onClick={() => dispatch(addToCart(item))}
                    >
                      <MdAddShoppingCart />
                      Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}