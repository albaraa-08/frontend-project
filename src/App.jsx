import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Home from "./Components/Home"
import Products from './Components/products/Products'
import Categories from "./Components/Categories"
import Cart from "./Components/Cart"
import Profile from "./Components/Profile"
import GlobalNavbar from './Components/GlobalNavbar'
import Login from './Components/Login'
import Register from './Components/Register'
import ProductsDetails from './Components/products/ProductDetails'
import Checkout from './Components/Checkout'
import Users from './Components/users/Users'
import UserDetails from './Components/users/UserDetails'
import Inventory from "../src/Components/inventory/Inventory"
import CartManagement from './Components/CartManagement'


export default function App() {
  return (
    
    <Container fluid>

        <GlobalNavbar />

        <Routes>
            <Route path='/' Component={Home} />
            <Route path='/login' Component={Login} />
            <Route path='/register' Component={Register} />
            <Route path='/home' Component={Home} />
            <Route path='/products' Component={Products} />
            <Route path='/categories' Component={Categories} />
            <Route path='/cart' Component={Cart} />
            <Route path='/cart-management' Component={CartManagement} />
            <Route path='/checkout' Component={Checkout} />
            <Route path='/profile' Component={Profile} />
            <Route path='/product-details/:id' Component={ProductsDetails} />
            <Route path='/users' Component={Users} />
            <Route path='users/:id' Component={UserDetails} />
            <Route path='/inventory' Component={Inventory} />
            <Route />
        </Routes>

    </Container>
  )
}
