"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../modules/product/product.route");
const user_route_1 = require("../modules/user/user.route");
const cart_route_1 = require("../modules/cart/cart.route");
const auth_route_1 = require("../modules/auth/auth.route");
const stripe_route_1 = require("../modules/others/stripe.route");
// import { OrderRoutes } from "../modules/order/order.route";
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/cart",
        route: cart_route_1.CartRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/stripe",
        route: stripe_route_1.StripeRoutes,
    },
    // {
    //   path: "orders",
    //   route: OrderRoutes,
    // },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
