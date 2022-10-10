import jwt from "jsonwebtoken";
import db from "../models/index.js";
const Users = db.users;

const isSuperAdmin = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role !== 1) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }

  next();
};

const isAdminCS = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role !== 2) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }

  next();
};

const isAdminCashier = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role !== 3) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }

  next();
};

const isAdminDesign = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role !== 4) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }

  next();
};

const isAdminWarehouse = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role !== 5) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }

  next();
};

const isAdminProduction = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role !== 6) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }

  next();
};

const isAdminTu = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role !== 7) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }

  next();
};

const isUser = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role !== 8) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }

  next();
};

export { isSuperAdmin };
