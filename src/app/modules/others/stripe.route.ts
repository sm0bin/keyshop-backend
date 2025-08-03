import { Router } from "express";
import Stripe from "stripe";
import { success } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const router = Router();

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  //   const { products } = req.body;

  const lineItems = req.body.map((p) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: p.product.title,
        images: [p.product.image],
      },
      unit_amount: p.product.price * 100,
    },
    quantity: p.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/sucess",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.send({
    success: true,
    sessionId: session.id,
  });
  //   res.json({ id: session.id });
});

router.get("/session-status", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.send({
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).send({ error: error.message });
  }
});

export const StripeRoutes = router;
