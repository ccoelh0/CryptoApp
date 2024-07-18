import { Router } from "express";
import cryptoRoutes from "./crypto.routes";
import filesRoutes from "./file.routes";

const router = Router();
const apiPrefix = `/api/v1`;

const routes = [
  {
    path: `${apiPrefix}/crypto`,
    route: cryptoRoutes,
  },
  {
    path: `${apiPrefix}/files`,
    route: filesRoutes,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
