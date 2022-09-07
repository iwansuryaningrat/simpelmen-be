import {
  verifyToken,
  isAdmin,
  isAdminKasir,
  isAdminCS,
  isActivated,
} from "../controllers/auth.controllers.js";
import adminKasirBoard from "../controllers/cashier.controllers.js";
import { Express } from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const cashierRouter = (app) => {
  app.use(headers);

  router.get("/kasir", verifyToken, isActivated, isAdminKasir, adminKasirBoard);

  app.use("/api/test", router);
};
