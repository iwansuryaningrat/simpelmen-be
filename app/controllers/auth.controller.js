require ("dotenv").config();
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const nodeMailer = require("nodemailer");
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  var username_input = req.body.username;
  var password_input = req.body.password;
  var email_input = req.body.email;
  var role_input = req.body.role;
  User.create({
    username: username_input,
    email: email_input,
    password: bcrypt.hashSync(password_input, 8),
    role: role_input
  })
    .then(user => {
      res.status(201).send({
        message: "User created successfully!",
        user: user
      });
      const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, config.secret, {
        expiresIn: 300 // 5 minutes
      });
      const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });
      const mailOptions = {
        from: 'admin@gmail.com',
        to: user.email,
        subject: 'Account Activation Link',
        html: `
            <h2>Please click on given link to activate your account</h2>
            <button><a href="http://localhost:8080/api/auth/activate/${token}">Activate</a></button>
        `
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log(err)
        else
          console.log(info);
      }
      );
    }
    ).catch(err => {
      res.status(500).send({
        message: err.message
      });
    }
    );
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
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
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id, username: user.username, email: user.email,active : user.active , role: user.role}, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token
      });
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    }
    );
  };
exports.activate = (req, res) => {
  const { token } = req.params;
  jwt.verify(token, config.secret, (err, decodedToken) => {
    if (err) {
      return res.status(400).json({ error: "Incorrect or Expired link" });
    }
    const { id } = decodedToken;
    User.update({ active: true }, { where: { id } })
      .then(() => {
        res.status(200).json({ message: "Account activated successfully" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
  );
};