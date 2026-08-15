import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AddProductModal from "./AddProductModal";
import { API } from "../../api/apiServices";
import Errorhandling from "../../utlis/Errorhandling";
import InventoryTable from "./InventoryTable";
import { CiSearch } from "react-icons/ci";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

// Import Sidebar from parent directory
import Sidebar from "../Sidebar";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);

  const limit = 10;

  // Add Product Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    thumbnail: "",
  });

  // Edit & Delete Product Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const savedProducts = localStorage.getItem("inventoryProducts");
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          setProducts(parsedProducts);
          setFilteredProducts(parsedProducts);
        } else {
          const response = await API.get("/products?limit=194");
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
          localStorage.setItem(
            "inventoryProducts",
            JSON.stringify(response.data.products)
          );
        }
      } catch (error) {
        Errorhandling(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!search.trim()) {
        setFilteredProducts(products);
      } else {
        const keyword = search.toLowerCase();
        setFilteredProducts(
          products.filter(
            (product) =>
              product.title.toLowerCase().includes(keyword) ||
              product.category.toLowerCase().includes(keyword)
          )
        );
      }
      setSkip(0);
    }, 400);

    return () => clearTimeout(debounce);
  }, [search, products]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: "", category: "", price: "", stock: "", thumbnail: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      thumbnail: formData.thumbnail || "https://dummyjson.com/image/300x300",
      images: [formData.thumbnail || "https://dummyjson.com/image/300x300"],
    };
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    localStorage.setItem("inventoryProducts", JSON.stringify(updatedProducts));
    handleCloseModal();
  };

  const handleOpenEditModal = (product) => {
    setEditingProductId(product.id);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingProductId(null);
    setFormData({ title: "", category: "", price: "", stock: "", thumbnail: "" });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((product) =>
      product.id === editingProductId
        ? {
            ...product,
            title: formData.title,
            category: formData.category,
            price: Number(formData.price),
            stock: Number(formData.stock),
            thumbnail: formData.thumbnail,
          }
        : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    localStorage.setItem("inventoryProducts", JSON.stringify(updatedProducts));
    handleCloseEditModal();
  };

  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProduct(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;
    const updatedProducts = products.filter((product) => product.id !== selectedProduct.id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    localStorage.setItem("inventoryProducts", JSON.stringify(updatedProducts));
    handleCloseDeleteModal();
  };

  const currentProducts = filteredProducts.slice(skip, skip + limit);
  const total = filteredProducts.length;
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="d-flex" style={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      <Sidebar />

      <div className="flex-grow-1 py-4 px-2 px-md-4">
        <Container fluid>
          <Row className="align-items-center mb-4">
            <Col md={6}>
              <h2 className="fw-bold text-dark mb-1">Product Inventory</h2>
              <p className="text-muted mb-0">Manage your products and inventory levels.</p>
            </Col>

            <Col md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
              <Button
                className="d-flex align-items-center gap-2 px-3 rounded-3 fw-semibold shadow-sm"
                onClick={handleOpenModal}
                style={{ backgroundColor: "#4318FF", borderColor: "#4318FF" }}
              >
                Add Product
              </Button>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col lg={4}>
              <div className="d-flex align-items-center bg-white rounded-3 shadow-sm px-2">
                <CiSearch />
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={handleSearchChange}
                  className="border-0 shadow-none py-2 bg-transparent"
                />
              </div>
            </Col>
          </Row>

          <InventoryTable
            loading={loading}
            products={currentProducts}
            total={total}
            skip={skip}
            limit={limit}
            currentPage={currentPage}
            totalPages={totalPages}
            setSkip={setSkip}
            handleOpenEditModal={handleOpenEditModal}
            handleOpenDeleteModal={handleOpenDeleteModal}
          />
        </Container>

        <AddProductModal
          show={showModal}
          handleClose={handleCloseModal}
          handleCreateProduct={handleCreateProduct}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <EditProductModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleUpdateProduct={handleUpdateProduct}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <DeleteProductModal
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          selectedProduct={selectedProduct}
        />
      </div>
    </div>
  );
}