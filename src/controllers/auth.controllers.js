import db from "../models/index.js";
const User = db.user;
import mailgun from "mailgun-js";
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
  const data = {
    from: "Admin <widiw598@gmail.com>",
    to: email_input,
    subject: "Email Verification",
    html: `
    <html>
    <head>
    <style>
    .container {
      width: 100%;
      height: 100%;
      background-color: orange;
      padding: 20px;
    }
    .card {
      width: 400px;
      height: 400px;
      background-color: white;
      margin: 0 auto;
      margin-top: 100px;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .card h1 {
      text-align: center;
      font-size: 30px;
      margin-bottom: 20px;
    }
    .card p {
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .card a {
      text-decoration: none;
      background-color: #000;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      display: block;
      width: 100px;
      text-align: center;
      margin: 0 auto;
    }
    </style>
    </head>
    <body>
    <div class="container">
    <div class="card">
    <h1>Verify Email</h1>
    <p>Click the button below to verify your email address.</p>
    <a href="http://localhost:8080/api/auth/activate/${token}">Verify</a>
    </div>
    </div>
    </body>
    </html>
    `,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.json({
        error: err.message,
      });
    }
    return res.json({
      message: "Email has been sent",
    });
  });
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
          id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        id: user.user_id,
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
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(400).send({ message: "Incorrect or Expired link" });
      } else {
        const { username, password, email, role, active } = decodedToken;
        User.create({
          username: username,
          password: bcrypt.hashSync(password, 8),
          email: email,
          role: role,
          active: 1,
        })
          .then((user) => {
            res.status(200).send({ message: "Account activated" });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      }
    });
  } else {
    res.status(400).send({ message: "Something went wrong" });
  }
};

const SendResetPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: 1800,
        }
      );
      const DOMAIN = process.env.MAILGUN_DOMAIN;
      const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: DOMAIN,
      });
      const data = {
        from: "Admin <widiw598@gmail.com>",
        to: email,
        subject: "Reset Password",
        html: `
        <html>
        <head>
        <style>
        .container {
          width: 100%;
          height: 100%;
          background-color: orange;
          padding: 20px;
        }
        .card {
          width: 400px;
          height: 400px;
          background-color: white;
          margin: 0 auto;
          margin-top: 100px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .card h1 {
          text-align: center;
          font-size: 30px;
          margin-bottom: 20px;
        }
        .card p {
          text-align: center;
          font-size: 20px;
          margin-bottom: 20px;
        }
        .card a {
          text-decoration: none;
          background-color: #000;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          display: block;
          width: 100px;
          text-align: center;
          margin: 0 auto;
        }
        </style>
        </head>
        <body>
        <div class="container">
        <div class="card">
        <h1>Reset Password</h1>
        <p>Click the button below to reset your password.</p>
        <a href="http://localhost:8080/api/auth/reset/${token}">Reset</a>
        </div>
        </div>
        </body>
        </html>
        `,
      };
      mg.messages().send(data, function (error, body) {
        if (error) {
          return res.json({
            error: err.message,
          });
        }
        return res.json({
          message: "Email has been sent",
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
const ResetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(400).send({ message: "Incorrect or Expired link" });
      } else {
        const { email } = decodedToken;
        User.findOne({
          where: {
            email: email,
          },
        })
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: "User Not found." });
            }
            user
              .update({
                password: bcrypt.hashSync(password, 8),
              })
              .then(() => {
                res.status(200).send({ message: "Password updated" });
              })
              .catch((err) => {
                res.status(500).send({ message: err.message });
              });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      }
    });
  } else {
    res.status(400).send({ message: "Something went wrong" });
  }
};
export { signup, signin, activate, SendResetPassword, ResetPassword };
