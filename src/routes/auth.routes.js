import checkEmail from "../middlewares/verify.middleware.js";
import { signup, signin, activate } from "../controllers/auth.controllers.js";

import { Express } from "express";
const router = Express.Router();

import headers from "../services/headers.js";

const authRouter = (app) => {
  app.use(headers);

  router.post("/signup", checkEmail, signup);
  router.post("/signin", signin);
  router.get("/activate/:token", activate);

  app.use("/api/auth", router);
};
