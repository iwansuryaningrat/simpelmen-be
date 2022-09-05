import "dotenv/config";
import db from "../models/index.js";
const User = db.user;
import nodemailer from "nodemailer";
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signup = (req, res) => {
  var username_input = req.body.username;
  var password_input = req.body.password;
  var email_input = req.body.email;
  var role_input = req.body.role;
  var active_input = 0;

  const token = jwt.sign(
    {
      email: email_input,
      active: active_input,
      username: username_input,
      password: password_input,
      role: role_input,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: 1800,
    }
  );
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: "admin@gmail.com",
    to: email_input,
    subject: "Account Activation Link",
    html: `
        <h2>Please click on given link to activate your account</h2>
        <button><a href="http://localhost:8080/api/auth/activate/${token}">Activate</a></button>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.status(200).send({ message: "Email has been sent" });
};
const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          active: user.active,
          role: user.role,
        },
        config.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const activate = (req, res) => {
  const { token } = req.params;
  jwt.verify(token, config.secret, (err, decodedToken) => {
    if (err) {
      return res.status(400).json({ error: "Incorrect or Expired link" });
    }
    const { email, active, username, password, role } = decodedToken;
    //create account
    User.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
      role: role,
      active: 1,
    })
      .then((user) => {
        res.status(200).send({ message: "Account has been activated" });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  });
};

export { signup, signin, activate };
