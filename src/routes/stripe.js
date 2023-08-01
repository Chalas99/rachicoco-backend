const express = require("express");
const router = express.Router();
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const customerController = require('../controllers/customer.controller');

router.post('/create-checkout-session', async (req, res) => {

    const customerID = req.body.customerID;
    const total = req.body.totalPrice;
    const line_items = req.body.cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.Name,
              description: item.description,
              metadata: {
                id: item.productID,
                customerID: customerID,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity:1,
        };
      });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url:session.url, cartItems:req.body.cartItems, cutomerID:customerID});
    if(session){
        await customerController.placeOrder(req.body.cartItems, customerID, total)
    }else{
        console.log("Order placing failed")
    }
});

  module.exports = router;