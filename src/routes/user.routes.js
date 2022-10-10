import {
    showProfile,updateProfile,getCity,getSubDistrict,getPronvince
} from '../controllers/users/user.controller.js';
import {
    isUser
} from '../middlewares/roles.middlewares.js';
import {
    isActivated,isLogin
} from '../middlewares/auth.middlewares.js';
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const userRoutes = (app) => {
    app.use(headers);

    router.get("/profile", isLogin, isActivated, isUser, showProfile);
    router.put("/profile", isLogin, isActivated, isUser, updateProfile);
    router.get("/city", getCity);
    router.get("/district", getSubDistrict);
    router.get("/province", getPronvince);
    app.use("/api/user", router);
};
export default userRoutes;
