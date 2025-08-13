import { Router } from "express";
import Stripe from "stripe";
import { success } from "zod";
import { Cart } from "../cart/cart.model";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../user/user.constant";
import { Product } from "../product/product.model";
import { IProduct } from "../product/product.interface";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const router = Router();

export interface ICartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: IProduct;
}

router.post(
  "/create-checkout-session",
  authVerify(USER_ROLE.user, USER_ROLE.admin),
  async (req, res) => {
    console.log(req.body);
    //   const { products } = req.body;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user.id, status: "active" },
      { $set: { status: "paid" } },
      { new: true }
    );

    const bulkOperations = req.body.map((p: ICartItem) => ({
      updateOne: {
        filter: { _id: p.productId, isDeleted: false },
        update: { $inc: { quantity: -p.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOperations);

    const lineItems = req.body.map((p: ICartItem) => ({
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
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.send({
      success: true,
      sessionId: session.id,
    });
    //   res.json({ id: session.id });
  }
);

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
