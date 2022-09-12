import checkEmail from "../middlewares/verify.middleware.js";
import { signup, signin, activate, SendResetPassword , ResetPassword} from "../controllers/auth.controllers.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const authRoutes = (app) => {
  app.use(headers);

  router.post("/signup", checkEmail, signup);
  router.post("/signin", signin);
  router.get("/activate/:token", activate);
  router.post("/reset", SendResetPassword);
  router.post("/reset/:token", ResetPassword);

  app.use("/api/auth", router);
};

export default authRoutes;
