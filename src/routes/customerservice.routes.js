const { authJwt } = require("../middleware");
const customerservice = require("../controllers/customerService.controllers.js");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/test/cs",
    [authJwt.verifyToken, authJwt.isAdminCS, authJwt.isActivated],
    customerservice.adminCSBoard
  );
};
