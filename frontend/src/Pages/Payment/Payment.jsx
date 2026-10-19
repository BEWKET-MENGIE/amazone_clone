import React, { useContext, useState } from 'react';
import LayOut from '../../Component/LayOut/LayOut';
import { DataContext } from "../../Component/DataProvider/DataProvider";
import CurrencyFormat from "../../Component/CurrencyFormat/CurrencyFormat";
import ProductCard from "../../Component/Product/ProductCard";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { axiosInstance } from "../../Api/Axios";
import { Type } from "../../Utility/action.type";
import classes from "./Payment.module.css";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Payment = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => (item.amount || 1) + amount, 0) || 0;
  const total = basket?.reduce((amount, item) => (item.price * (item.amount || 1)) + amount, 0) || 0;

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (total <= 0) {
      setCardError("Your basket is empty!");
      return;
    }
    if (!stripe || !elements) return;

    try {
      setProcessing(true);
      
      // 1. Backend request to get Stripe clientSecret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${Math.round(total * 100)}`,
      });
      const clientSecret = response.data.clientSecret;

      // 2. Confirm card payment using Stripe elements
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (stripeError) {
        setCardError(stripeError.message);
        setProcessing(false);
        return;
      }

      // 3. Save order to Firebase Firestore (Modular v9 syntax)
      await setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // 4. Empty basket, stop loading, and redirect to orders page
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { message: "You have placed a new order" } });
    } catch (err) {
      console.error("Payment Error:", err);
      setCardError(err.response?.data?.message || err.message);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem} items)</div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h2>Delivery Address</h2>
          <div>
            <div>{user?.email || "guest@example.com"}</div>
            <div>123 University Ave</div>
            <div>Campus Center</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h2>Review items and delivery</h2>
          <div style={{ width: '100%' }}>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} key={item.id} renderDescription={false} renderAdd={false} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h2>Payment Method</h2>
          <div className={classes.payment_card_container}>
            <form onSubmit={handlePayment}>
              {cardError && <small style={{ color: "red", display: "block", marginBottom: "10px" }}>{cardError}</small>}
              <div style={{ padding: '12px', border: '1px solid darkgray', borderRadius: '4px', background: 'white' }}>
                <CardElement onChange={handleChange} />
              </div>
              <div className={classes.payment_price}>
                <span style={{ display: "flex", gap: "10px", fontWeight: "bold" }}>
                  <p>Total Order:</p> <CurrencyFormat amount={total} />
                </span>
                <button type='submit' disabled={processing || !stripe}>
                  {processing ? <ClipLoader color="#111" size={15} /> : "Pay Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;