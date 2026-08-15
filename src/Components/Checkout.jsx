import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { FiTruck, FiArrowRight } from "react-icons/fi";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdCreditCard, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { FaArrowRotateLeft } from "react-icons/fa6";

export default function Checkout() {
  const dispatch = useDispatch();
  const { items: cartItems = [], totalAmount = 0 } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const subtotal = totalAmount;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const { firstName, lastName, address, city, zipCode, phone, cardNumber, expiryDate, cvc } = formData;

    if (!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim() || !zipCode.trim() || !phone.trim()) {
      alert("fill the required information please");
      setErrorMessage("fill the required information please");
      setSuccessMessage("");
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber.trim() || !expiryDate.trim() || !cvc.trim())) {
      alert("fill the required information please");
      setErrorMessage("fill the required information please");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("order confirmed");
    alert("order confirmed");
    dispatch(clearCart());
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '3rem' }}>
      <Container>
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">Secure Checkout</h2>
          <p className="text-muted">Complete your order with ShopStream's verified protection.</p>
        </div>

        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible className="mb-4 fw-bold">
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible className="mb-4 fw-bold">
            {successMessage}
          </Alert>
        )}

        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <span 
              className="rounded-circle text-white d-inline-flex align-items-center justify-content-center fw-bold"
              style={{ width: '28px', height: '28px', backgroundColor: '#4f46e5', fontSize: '14px' }}
            >
              1
            </span>
            <span className="fw-bold text-primary">Shipping</span>
          </div>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#e2e8f0' }} />
          <div className="d-flex align-items-center gap-2 text-muted">
            <span 
              className="rounded-circle d-inline-flex align-items-center justify-content-center fw-semibold border"
              style={{ width: '28px', height: '28px', fontSize: '14px', backgroundColor: '#fff' }}
            >
              2
            </span>
            <span>Payment</span>
          </div>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#e2e8f0' }} />
          <div className="d-flex align-items-center gap-2 text-muted">
            <span 
              className="rounded-circle d-inline-flex align-items-center justify-content-center fw-semibold border"
              style={{ width: '28px', height: '28px', fontSize: '14px', backgroundColor: '#fff' }}
            >
              3
            </span>
            <span>Review</span>
          </div>
        </div>

        <Row className="g-4">
          <Col lg={7} xl={8}>
            {/* Shipping Card */}
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <FiTruck size={20} className="text-primary" />
                <h5 className="fw-bold m-0 text-dark">Shipping Information</h5>
              </div>

              <Form>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold text-secondary">First Name *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="firstName" 
                        placeholder="Christopher" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        className="py-2" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold text-secondary">Last Name *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="lastName" 
                        placeholder="Nolan" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        className="py-2" 
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold text-secondary">Address *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="address" 
                        placeholder="123 Commerce Way" 
                        value={formData.address} 
                        onChange={handleChange} 
                        className="py-2" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold text-secondary">City *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="city" 
                        placeholder="New York" 
                        value={formData.city} 
                        onChange={handleChange} 
                        className="py-2" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold text-secondary">Zip Code *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="zipCode" 
                        placeholder="10001" 
                        value={formData.zipCode} 
                        onChange={handleChange} 
                        className="py-2" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold text-secondary">Phone Number *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="phone" 
                        placeholder="+1 (555) 000-0000" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="py-2" 
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card>

            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <FcMoneyTransfer size={22} />
                <h5 className="fw-bold m-0 text-dark">Payment Method</h5>
              </div>

              <div 
                className={`p-3 rounded-3 border mb-3 ${
                  paymentMethod === 'card' ? 'border-primary bg-primary bg-opacity-10' : ''
                }`}
                style={{ borderColor: paymentMethod === 'card' ? '#4f46e5' : '#e2e8f0' }}
              >
                <div 
                  className="d-flex align-items-center justify-content-between"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setPaymentMethod('card')}
                >
                  <Form.Check 
                    type="radio"
                    id="card-radio"
                    label={<span className="fw-bold text-dark ms-2">Credit or Debit Card</span>}
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <MdCreditCard size={22} className="text-secondary" />
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-3 pt-2">
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold text-secondary">Card Number *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="cardNumber" 
                        placeholder="0000 0000 0000 0000" 
                        value={formData.cardNumber} 
                        onChange={handleChange} 
                        className="py-2" 
                      />
                    </Form.Group>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-semibold text-secondary">Expiry Date *</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="expiryDate" 
                            placeholder="MM/YY" 
                            value={formData.expiryDate} 
                            onChange={handleChange} 
                            className="py-2" 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-semibold text-secondary">CVC *</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="cvc" 
                            placeholder="123" 
                            value={formData.cvc} 
                            onChange={handleChange} 
                            className="py-2" 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>

              <div 
                className={`p-3 rounded-3 border ${
                  paymentMethod === 'paypal' ? 'border-primary bg-primary bg-opacity-10' : ''
                }`}
                style={{ borderColor: paymentMethod === 'paypal' ? '#4f46e5' : '#e2e8f0' }}
              >
                <div 
                  className="d-flex align-items-center justify-content-between"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <Form.Check 
                    type="radio"
                    id="paypal-radio"
                    label={<span className="fw-bold text-dark ms-2">PayPal</span>}
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <MdOutlineAccountBalanceWallet size={22} className="text-secondary" />
                </div>
              </div>
            </Card>

            <div className="d-flex justify-content-center mt-4">
              <Button 
                type="button"
                onClick={handlePlaceOrder}
                style={{ backgroundColor: '#4f46e5', border: 'none', minWidth: '220px' }} 
                className="py-3 px-5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
              >
                Place Order 
                <FiArrowRight size={18} />
              </Button>
            </div>
          </Col>

          <Col lg={5} xl={4}>
            <Card className="border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: '#eef2ff' }}>
              <h5 className="fw-bold text-dark mb-4">Order Summary</h5>

              <div className="d-flex flex-column gap-3 mb-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted fw-bold mb-0">Your cart is empty.</p>
                    <small className="text-secondary">Add items to your cart to see them here.</small>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="d-flex align-items-center gap-3">
                      <img 
                        src={item.thumbnail || item.image} 
                        alt={item.title} 
                        className="rounded-3" 
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="fw-bold text-dark mb-0 small">{item.title}</h6>
                        <small className="text-muted">qty: {item.quantity || 1}</small>
                      </div>
                      <span className="fw-bold text-primary">
                        ${((item.price) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="d-flex flex-column gap-2 border-top border-bottom py-3 mb-3" style={{ borderColor: '#e0e7ff' }}>
                <div className="d-flex justify-content-between text-secondary small">
                  <span>Subtotal</span>
                  <span className="fw-semibold text-dark">${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary small">
                  <span>Shipping</span>
                  <span className="fw-bold text-success">{subtotal > 0 ? 'FREE' : '$0.00'}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary small">
                  <span>Tax (Est.)</span>
                  <span className="fw-semibold text-dark">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-dark m-0">Total</h5>
                <h4 className="fw-bold m-0" style={{ color: '#4f46e5' }}>${total.toFixed(2)}</h4>
              </div>

              <InputGroup className="mb-4">
                <Form.Control 
                  placeholder="Promo Code" 
                  className="bg-white border-0 py-2 shadow-none"
                />
                <Button 
                  style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', border: 'none' }}
                  className="fw-bold px-3"
                >
                  Apply
                </Button>
              </InputGroup>

              <div className="p-3 rounded-3 d-flex flex-column gap-2" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
                <div className="d-flex align-items-center gap-2 small fw-medium">
                  <GoShieldCheck />
                  <span>256-bit SSL Secure Payment</span>
                </div>
                <div className="d-flex align-items-center gap-2 small fw-medium">
                  <FaArrowRotateLeft />
                  <span>30-Day Money Back Guarantee</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}