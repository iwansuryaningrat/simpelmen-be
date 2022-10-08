import { signup, activate, login } from "../controllers/auth.controllers.js";
import { isLogin, isActivated } from "../middlewares/auth.middlewares.js";
import { checkEmail } from "../middlewares/accountChecker.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const authRoutes = (app) => {
  app.use(headers);

  router.post("/signup", checkEmail, signup);
  router.get("/activate/:token", activate);
  router.post("/login", login);

  app.use("/api/auth", router);
};

export default authRoutes;
