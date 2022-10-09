import { signup, activate ,signin} from "../controllers/auth.controllers.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const authRoutes = (app) => {
  app.use(headers);

  router.post("/register", signup);
  router.get("/activate/:token", activate);
  router.post("/login", signin);

  app.use("/api/auth", router);
};

export default authRoutes;
