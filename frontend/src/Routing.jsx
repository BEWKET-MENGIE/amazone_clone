import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing'
import Cart from './Pages/Cart/Cart'
import Order from './Pages/Order/Order'
import Payment from './Pages/Payment/Payment'
import AuthPage from './Pages/Auth/AuthPage'
import Result from './Pages/Results/Result';
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Loader from './Component/Loader/Loader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRout from "./Component/ProtectedRout/ProtectedRout";
const stripePromise = loadStripe('pk_test_51T8bxQAh75mg9RTh8PECxcqIouRj7vhT761GuNFIjuBLN6XXD2wEHLPI6a0fAtSkfaADD2wbmlPP3OBTkBJMnGO300zdYtVjgd');
const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<AuthPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order/>} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail/>}/>
        <Route path="/payment" element={
          <ProtectedRout message={"you must login to pay"} redirect={"/payment"}>
        <Elements stripe={stripePromise}>
          <Payment/>
          </Elements>
          </ProtectedRout>
         }
          />
        <Route path="/Loader" element={ <Loader/>} />
    </Routes>
    </Router>
  );
};

export default Routing;








