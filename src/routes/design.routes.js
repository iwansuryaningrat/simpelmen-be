import {
  verifyToken,
  isAdminDesign,
  isActivated,
} from "../middlewares/auth.middleware.js";
import {
  showProfile,
  updateProfile,
} from "../controllers/users/design.controller.js";
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const designRoutes = (app) => {
  app.use(headers);

  router.get(
    "/design/profile",
    verifyToken,
    isActivated,
    isAdminDesign,
    showProfile
  );
  router.put(
    "/design/profile",
    verifyToken,
    isActivated,
    isAdminDesign,
    updateProfile
  );

  app.use("/api/admin", router);
};

export default designRoutes;
