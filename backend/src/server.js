const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize Stripe with your Secret Key (Replace with your actual test secret key or use process.env)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "sk_test_51...your_stripe_secret_key_here");

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Test route to check if server is running
app.get("/", (req, res) => {
  res.status(200).json({ message: "Amazon Backend API is running successfully!" });
});

// Payment Intent Route (This fixes your 404 error!)
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Stripe Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Total amount must be greater than 0" });
  }
});

// Choose your backend port (e.g., 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Amazon Backend Server is running on port ${PORT}`);
});