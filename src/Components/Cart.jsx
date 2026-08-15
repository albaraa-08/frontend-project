import React from 'react'
import { Alert, Image, Button, Card, Col, Container, Row, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../store/slices/cartSlice';
import emptycart from "../assets/emptycart.jpg"
import { useNavigate } from 'react-router-dom';
export default function Cart() {

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  if (!items || items.length === 0) {
    return (
      <Container className="text-center py-5">
        <div className="d-flex justify-content-center mb-4">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center bg-light"
            style={{ width: "200px", height: "200px" }}
          >
            <Image 
              src={emptycart}
              alt='empty cart'
              width={100} 
              height={100} 
              style={{ objectFit : "contain"}}
            />
          </div>
        </div>

        <h2 className="fw-bold mb-2">Your cart is feeling light</h2>
        <p className="text-muted mb-4">
          It looks like you haven't added anything to your cart yet.<br />
          Let's find something special for you.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="primary" onClick={()=> navigate("/products")}  style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}>Start Shopping</Button>
          <Button variant="outline-primary" style={{ color: "#4f46e5", borderColor: "#4f46e5" }}>View Saved Items</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">Your Shopping Cart</h2>
      
      <Row className='g-3'>
        <Col lg={8} className="d-grid gap-3 align-content-start">
          {items.map((item) => (
            <Card key={item.id} className="border-0 shadow-sm">
              <Row className='g-3 p-3 align-items-center'>
                <Col lg={2} xs={4}>
                  <Image src={item.thumbnail} fluid className='rounded' />
                </Col>

                <Col lg={7} xs={8}>
                  <h5 className="fw-bold mb-1">{item.title}</h5>
                  <p className='text-muted small text-truncate mb-2'>{item.description}</p>
                  
                  {/* Styled Quantity Controls */}
                  <div className="d-inline-flex align-items-center border rounded bg-light px-1 py-1">
                    <Button 
                      variant="link" 
                      className="text-dark text-decoration-none px-2 py-0 fw-bold"
                      onClick={() => dispatch(decreaseQuantity(item))}
                    >
                      −
                    </Button>
                    <span className="px-2 fw-semibold small">{item.quantity}</span>
                    <Button 
                      variant="link" 
                      className="text-dark text-decoration-none px-2 py-0 fw-bold"
                      onClick={() => dispatch(increaseQuantity(item))}
                    >
                      +
                    </Button>
                  </div>
                </Col>

                <Col lg={3} className='d-flex flex-column text-end'>
                  <h5 className="fw-bold" style={{ color: '#4f46e5' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </h5>
                  <Button 
                    variant="link" 
                    className='text-danger p-0 mt-auto text-decoration-none border-0 text-end' 
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card className='p-4 border-0 shadow-sm'>
            <Card.Title className="mb-3 fw-bold">Order Summary</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between px-0">
                <span>Subtotal</span>
                <span className="fw-semibold">${totalAmount.toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between px-0">
                <span>Shipping</span>
                <span className='text-success fw-semibold'>Free</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between px-0">
                <span>Estimated Tax</span>
                <span className="fw-semibold">${(totalAmount * 0.08).toFixed(2)}</span>
              </ListGroup.Item>
            </ListGroup>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <h5 className="fw-bold m-0">Total</h5>
              <h4 className="fw-bold m-0" style={{ color: '#4f46e5' }}>
                ${(totalAmount * 1.08).toFixed(2)}
              </h4>
            </div>

            <Button size='lg' className='mt-3 w-100 fw-bold border-0' onClick={handleProceedToCheckout} style={{ backgroundColor: "#4f46e5" }}>
              Proceed to checkout
            </Button>
          </Card>
        </Col>
      </Row>

      <Button 
        variant="danger" 
        className='mt-3 w-100' 
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </Button>
    </Container>
  )
}