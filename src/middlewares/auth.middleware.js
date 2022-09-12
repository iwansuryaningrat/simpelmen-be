import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
const isActivated = (req, res, next) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded.active == 0) {
      return res.status(401).send({
        message: "Email not activated or Token expired!",
      });
    }
    next();
  });
};
const isSuperAdmin = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (err, decoded) => {
    User.findOne({
      where: {
        user_id: decoded.id,
        role: decoded.role,
      },
    }).then((user) => {
      if (user.role === "super_admin") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};
const isAdminCashier = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (err, decoded) => {
    User.findOne({
      where: {
        user_id: decoded.id,
        role: decoded.role,
      },
    }).then((user) => {
      if (user.role === "cashier") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};
const isAdminCS = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (err, decoded) => {
    User.findOne({
      where: {
        user_id: decoded.id,
        role: decoded.role,
      },
    }).then((user) => {
      if (user.role === "customer_service") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};
const isAdminWarehouse = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (err, decoded) => {
    User.findOne({
      where: {
        user_id: decoded.id,
        role: decoded.role,
      },
    }).then((user) => {
      if (user.role === "admin_warehouse") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};
const isAdminDesign = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (err, decoded) => {
    User.findOne({
      where: {
        user_id: decoded.id,
        role: decoded.role,
      },
    }).then((user) => {
      if (user.role === "admin_design") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};
const isUser = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (err, decoded) => {
    User.findOne({
      where: {
        user_id: decoded.id,
        role: decoded.role,
      },
    }).then((user) => {
      if (user.role === "user") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};
const isAdminProduction = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (err, decoded) => {
    User.findOne({
      where: {
        user_id: decoded.id,
        role: decoded.role,
      },
    }).then((user) => {
      if (user.role === "admin_production") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};
const isAdminTu = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET_KEY, (err, decoded) => {
    User.findOne({
      where: {
        user_id: decoded.id,
        role: decoded.role,
      },
    }).then((user) => {
      if (user.role === "admin_tu") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
    });
  });
};
export { verifyToken, isSuperAdmin, isAdminCashier, isAdminCS, isActivated , isAdminWarehouse,isAdminDesign,isUser , isAdminProduction,isAdminTu};
