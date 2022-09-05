const { authJwt } = require("../middleware");
const cashier = require("../controllers/Cashier.controller.js");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    app.get(
    "/api/test/kasir",
    [authJwt.verifyToken, authJwt.isAdminKasir , authJwt.isActivated],
    cashier.adminKasirBoard
    );
};
