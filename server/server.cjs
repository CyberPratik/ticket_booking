const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const { Cashfree } = require("cashfree-pg");
const { default: crypt } = require("crypt");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 5001;
// Cashfree Credentials
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);
  const orderId = hash.digest("hex");
  return orderId.substr(0, 12);
}
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/payment", async (req, res) => {
  try {
    const { customer_name, customer_phone, customer_email, ticketCount } =
      req.body;
    const orderAmount = 500.0 * ticketCount; // Calculate total price based on the number of tickets

    let request = {
      order_amount: orderAmount,
      order_currency: "INR",
      order_id: await generateOrderId(),
      customer_details: {
        customer_id: `cust_${customer_phone}`, // Using phone number as customer_id
        customer_phone: customer_phone,
        customer_name: customer_name,
        customer_email: customer_email,
      },
    };
    Cashfree.PGCreateOrder("2023-08-01", request)
      .then((response) => {
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
});
app.post("/verify", async (req, res) => {
  try {
    let { orderId } = req.body;
    Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
      .then((response) => {
        res.json(response.data);
      })
      .catch.error(error.response.data.message);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
