import {
    showProfile,updateProfile
} from '../controllers/users/user.controller.js';
import {
    isUser
} from '../middlewares/roles.middlewares.js';
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const userRoutes = (app) => {
    app.use(headers);

    router.get("/profile", isUser, showProfile);
    router.put("/profile", isUser, updateProfile);

    app.use("/api/user", router);
};
export default userRoutes;
