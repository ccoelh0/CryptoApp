import { Router } from "express";
import cryptoRoutes from "./crypto.routes";

const router = Router();
const apiPrefix = `/api/v1`;

const routes = [
  {
    path: `${apiPrefix}/crypto`,
    route: cryptoRoutes,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
