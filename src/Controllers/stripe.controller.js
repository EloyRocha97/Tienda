const express = require("express");
const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = process.env;
const { Product } = require("../db");

const stripe = new Stripe(STRIPE_SECRET_KEY);

const CreateSession = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.image],
            },
            currency: "usd",
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3001/success",
      cancel_url: "http://localhost:3001/cancel",
    });

    // Solo devolver la información del producto y la URL
    const result = {
      product,
      url: session.url,
    };

    return res.json(result);
  } catch (error) {
    console.error("Error al crear la sesión de pago:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  CreateSession,
};
