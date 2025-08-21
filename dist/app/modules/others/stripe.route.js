"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeRoutes = void 0;
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const cart_model_1 = require("../cart/cart.model");
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("../user/user.constant");
const product_model_1 = require("../product/product.model");
const config_1 = __importDefault(require("../../config"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const router = (0, express_1.Router)();
router.post("/create-checkout-session", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    //   const { products } = req.body;
    const updatedCart = yield cart_model_1.Cart.findOneAndUpdate({ userId: req.user.id, status: "active" }, { $set: { status: "paid" } }, { new: true });
    const bulkOperations = req.body.map((p) => ({
        updateOne: {
            filter: { _id: p.productId, isDeleted: false },
            update: { $inc: { quantity: -p.quantity } },
        },
    }));
    yield product_model_1.Product.bulkWrite(bulkOperations);
    const lineItems = req.body.map((p) => {
        var _a, _b, _c;
        return ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: (_a = p === null || p === void 0 ? void 0 : p.product) === null || _a === void 0 ? void 0 : _a.title,
                    images: [(_b = p === null || p === void 0 ? void 0 : p.product) === null || _b === void 0 ? void 0 : _b.image],
                },
                unit_amount: (((_c = p === null || p === void 0 ? void 0 : p.product) === null || _c === void 0 ? void 0 : _c.price) || p.price) * 100,
            },
            quantity: p.quantity,
        });
    });
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${config_1.default.clientUrl}/success`,
        cancel_url: `${config_1.default.clientUrl}/cancel`,
    });
    res.send({
        success: true,
        sessionId: session.id,
    });
    //   res.json({ id: session.id });
}));
exports.StripeRoutes = router;
