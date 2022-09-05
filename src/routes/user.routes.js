const controller = require("../controllers/user.controller");
import headers from "../services/headers.services.js";
import {
  verifyToken,
  isAdmin,
  isAdminCS,
  isAdminKasir,
  isActivated,
} from "../middlewares/auth.middleware.js";
import checkEmail from "../middlewares/verify.middleware.js";

import express from "express";
const router = express.Router();

const userRouter = (app) => {
  app.use(headers);

  // router.get("/", login, proMember, findAll);
  // router.post("/", login, admin, create);
  // router.get("/:id", login, proMember, findOne);
  // router.delete("/:id", login, admin, deleteWl);
  // router.put("/:id/nonactivate", login, admin, nonActivate);
  // router.put("/:id", login, admin, update);

  app.use("/api/v1/watchlists", router);
};

// module.exports = function (app) {
//   app.use(headers);

//   app.get("/api/test/all", controller.allAccess);

//   app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin, authJwt.isActivated],
//     controller.adminBoard
//   );
// };

export default userRouter;
