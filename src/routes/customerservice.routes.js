import {
  verifyToken,
  isAdminCS,
  isActivated,
} from "../middlewares/auth.middleware.js";
import {
  showProfile,updateProfile,
} from "../controllers/users/customerService.controllers.js";
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const customerServiceRoutes = (app) => {
  app.use(headers);

  router.get("/cs/profile", verifyToken, isActivated, isAdminCS, showProfile);
  router.put("/cs/profile", verifyToken, isActivated, isAdminCS, updateProfile);

  app.use("/api/admin", router);
};

export default customerServiceRoutes;
