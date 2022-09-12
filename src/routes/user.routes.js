import {
  verifyToken,
  isUser,
  isActivated,
} from "../middlewares/auth.middleware.js";
import {
  userBoard,
  userProfile,
} from "../controllers/users/user.controllers.js";
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const userRoutes = (app) => {
  app.use(headers);

  router.get("/", verifyToken, isActivated, isUser, userBoard);
  router.get("/profile", userProfile);
  app.use("/api/users", router);
};

export default userRoutes;
