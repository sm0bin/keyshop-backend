import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";
import { UserRoutes } from "../modules/user/user.route";
import { CartRoutes } from "../modules/cart/cart.route";
// import { OrderRoutes } from "../modules/order/order.route";

const router = Router();

const routes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  // {
  //   path: "orders",
  //   route: OrderRoutes,
  // },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
