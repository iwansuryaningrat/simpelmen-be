import {
  signup,
  activate,
  login,
  SendResetPassword,
  ResetPassword,
  refreshToken,
} from "../controllers/auth.controllers.js";
import { isActivated } from "../middlewares/auth.middlewares.js";
import { checkEmail } from "../middlewares/accountChecker.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const authRoutes = (app) => {
  app.use(headers);

  router.post("/signup", checkEmail, signup);
  router.get("/activate/:token", activate);
  router.post("/login",isActivated, login);
  router.post("/reset-password", SendResetPassword);
  router.post("/reset-password/:token", ResetPassword);
  router.post("/refresh-token", refreshToken);
  app.use("/api/auth", router);
};

export default authRoutes;