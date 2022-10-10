import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.users;

const isSuperAdmin = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === 1) {
    next();
  }
};

const isAdminCS = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === 2) {
    next();
  }
};

const isAdminCashier = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === 3) {
    next();
  }
};

const isAdminDesign = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === 4) {
    next();
  }
};

const isAdminWarehouse = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === 5) {
    next();
  }
};

const isAdminProduction = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === 6) {
    next();
  }
};

const isAdminTu = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === 7) {
    next();
  }
};

const isUser = (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === 8) {
    next();
  }
};

export { isSuperAdmin, isAdminCS, isAdminCashier, isAdminDesign, isAdminWarehouse, isAdminProduction, isAdminTu, isUser };
