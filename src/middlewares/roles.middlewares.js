import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.users;

const isSuperAdmin = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
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
      req.user_id = decoded.user_id;
      User.findOne({
        where: {
          user_id: req.user_id,
        },
      }).then((users) => {
        if (users.user_role_id == 1) {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Super Admin Role!",
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isAdminCashier = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
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
      req.user_id = decoded.user_id;
      User.findOne({
        where: {
          user_id: req.user_id,
        },
      }).then((users) => {
        if (users.user_role_id == 2) {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Admin Cashier Role!",
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isAdminCS = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
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
      req.user_id = decoded.user_id;
      User.findOne({
        where: {
          user_id: req.user_id,
        },
      }).then((users) => {
        if (users.user_role_id == 3) {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Admin Customer Service Role!",
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isAdminWarehouse = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
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
      req.user_id = decoded.user_id;
      User.findOne({
        where: {
          user_id: req.user_id,
        },
      }).then((users) => {
        if (users.user_role_id == 4) {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Admin Warehouse Role!",
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isAdminDesign = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
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
      req.user_id = decoded.user_id;
      User.findOne({
        where: {
          user_id: req.user_id,
        },
      }).then((users) => {
        if (users.user_role_id == 5) {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Admin Design Role!",
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isUser = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
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
      req.user_id = decoded.user_id;
      User.findOne({
        where: {
          user_id: req.user_id,
        },
      }).then((users) => {
        if (users.user_role_id == 8) {
          next();
          return;
        }
        res.status(403).send({
          message: "Login First!",
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isAdminProduction = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
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
      req.user_id = decoded.user_id;
      User.findOne({
        where: {
          user_id: req.user_id,
        },
      }).then((users) => {
        if (users.user_role_id == 6) {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Admin Produksi Role!",
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isAdminTu = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
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
      req.user_id = decoded.user_id;
      User.findOne({
        where: {
          user_id: req.user_id,
        },
      }).then((users) => {
        if (users.user_role_id == 7) {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Admin Tata Usaha Role!",
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  isSuperAdmin,
  isAdminCashier,
  isAdminCS,
  isAdminWarehouse,
  isAdminDesign,
  isUser,
  isAdminProduction,
  isAdminTu,
};
