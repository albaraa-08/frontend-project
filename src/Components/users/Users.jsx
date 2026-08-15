import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LuUserRoundPlus } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { FaUserLargeSlash } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { API } from "../../api/apiServices";
import Errorhandling from "../../utlis/Errorhandling";
import StatCard from "../StatCard";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import Sidebar from "../Sidebar";

export default function Users() {
  const STORAGE_KEY = "users";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);

  const limit = 10;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "Customer",
    password: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

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

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const total = filteredUsers.length;
  const paginatedUsers = filteredUsers.slice(skip, skip + limit);
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSkip(0);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ fullName: "", username: "", email: "", role: "Customer", password: "" });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ");

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      firstName,
      lastName,
      username: formData.username.replace(/^@/, ""),
      email: formData.email,
      role: formData.role,
      password: formData.password,
      image: "https://dummyjson.com/icon/user/128",
    };

    setUsers((prev) => [newUser, ...prev]);
    handleCloseModal();
  };

  const handleOpenEditModal = (user) => {
    setEditingUserId(user.id);
    setFormData({
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      username: user.username,
      email: user.email,
      role: user.role || "Customer",
      password: "",
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingUserId(null);
    setFormData({ fullName: "", username: "", email: "", role: "Customer", password: "" });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const nameParts = formData.fullName.trim().split(" ");
    const updatedUser = {
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" "),
      username: formData.username.replace(/^@/, ""),
      email: formData.email,
      role: formData.role,
    };

    if (formData.password.trim() !== "") {
      updatedUser.password = formData.password;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === editingUserId ? { ...user, ...updatedUser } : user))
    );
    handleCloseEditModal();
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
    handleCloseDeleteModal();
  };

  return (
    <div className="d-flex" style={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 py-4 px-2 px-md-4">
        <Container fluid>
          <Row className="align-items-center mb-4">
            <Col md={6}>
              <h2 className="fw-bold text-dark mb-1">User Directory</h2>
              <div className="text-muted small fw-semibold">
                <Link to="/" className="text-muted text-decoration-none">
                  Home
                </Link>
                <span className="mx-1">&gt;</span>
                <span className="text-dark fw-bold">
                  User Directory
                </span>
              </div>
            </Col>

            <Col md={6} className="d-flex gap-2 justify-content-md-end mt-3 mt-md-0">
              <div
                className="d-flex align-items-center bg-white rounded-3 shadow-sm px-2"
                style={{ maxWidth: "280px", width: "100%" }}
              >
                <CiSearch className="text-muted ms-1" size={20} />
                <Form.Control
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={handleSearchChange}
                  className="border-0 shadow-none py-2 small bg-transparent"
                />
              </div>
              <Button
                variant="primary"
                onClick={handleOpenModal}
                className="d-flex align-items-center gap-2 px-3 rounded-3 fw-semibold shadow-sm text-nowrap"
                style={{ backgroundColor: "#4318FF", borderColor: "#4318FF" }}
              >
                <LuUserRoundPlus size={20} />
                Add New User
              </Button>
            </Col>
          </Row>
          <Row className="g-3 mb-4">
            <StatCard
              icon={<MdOutlinePeopleAlt size={20} />}
              title="Total Users"
              value={total.toLocaleString()}
              bgColor="#EEF2FF"
              iconColor="#4318FF"
            />
            <StatCard
              icon={<GoShieldCheck size={20} />}
              title="Admins"
              value="12"
              bgColor="#E6F4EA"
              iconColor="#137333"
            />
            <StatCard
              icon={<FaUserLargeSlash size={20} />}
              title="Inactive"
              value="48"
              bgColor="#FCE8E6"
              iconColor="#C5221F"
            />
            <StatCard
              icon={<IoCartOutline size={20} />}
              title="New Signups"
              value="+154"
              bgColor="#F3E8FF"
              iconColor="#7E22CE"
            />
          </Row>
          <UserTable
            loading={loading}
            users={paginatedUsers}
            total={total}
            skip={skip}
            limit={limit}
            currentPage={currentPage}
            totalPages={totalPages}
            setSkip={setSkip}
            handleOpenDeleteModal={handleOpenDeleteModal}
            handleOpenEditModal={handleOpenEditModal}
          />
        </Container>
        <AddUserModal
          show={showModal}
          handleCloseModal={handleCloseModal}
          handleCreateUser={handleCreateUser}
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <EditUserModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleUpdateUser={handleUpdateUser}
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <DeleteUserModal
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
}