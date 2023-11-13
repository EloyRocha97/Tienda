const { Router } = require("express");

const { CreateSession } = require("../Controllers/stripe.controller");

const stripeRouter = Router();

stripeRouter.post("/create-checkout-session/:productId", CreateSession);
stripeRouter.get("/success", (req, res) => res.send("success"));
stripeRouter.get("/cancel", (req, res) => res.send("cancel"));

module.exports = stripeRouter;
