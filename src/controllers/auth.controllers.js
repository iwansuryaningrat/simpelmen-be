import db from "../models/index.js";
const Users = db.users;
import mailgun from "mailgun-js";
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Load .env file
import * as dotenv from "dotenv";
dotenv.config();

const signup = (req, res) => {
  const name_input = req.body.name;
  const email_input = req.body.email;
  const password_input = req.body.password;

  const token = jwt.sign(
    {
      email: email_input,
      name: name_input,
      password: password_input,
    },
    process.env.JWT_SECRET,
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
    <a href="http://localhost:3000/api/auth/activate/${token}">Verify</a>
    </div>
    </div>
    </body>
    </html>
    `,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.status(500).send({
        error: err.message,
      });
    }

    return res.status(200).send({
      message: "Email has been sent",
    });
  });
};

const activate = (req, res) => {
  const { token } = req.params;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).send({ message: "Incorrect or Expired link" });
      } else {
        const { name, email, password } = decodedToken;
        Users.create({
          user_name: name,
          user_password: bcrypt.hashSync(password, 8),
          user_email: email,
          user_status: true,
          user_verify: true,
          user_role_id: 1,
        })
          .then((user) => {
            res.status(200).send({
              message: "Account has been activated",
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

const login = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({
    where: {
      user_email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.user_password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign(
        {
          user_id: user.user_id,
          user_name: user.user_name,
          user_email: user.user_email,
          user_role_id: user.user_role_id,
          user_status: user.user_status,
          user_verify: user.user_verify,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      res.status(200).send({
        message: "Login Success",
        data: {
          user_email: user.user_email,
          token: token,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const SendResetPassword = (req, res) => {
  const { email } = req.body;

  Users.findOne({
    where: {
      user_email: email,
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
        process.env.JWT_SECRET,
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
          return res.status(500).json({
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
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).send({ message: "Incorrect or Expired link" });
      } else {
        const { email } = decodedToken;
        Users.findOne({
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
                user_password: bcrypt.hashSync(password, 8),
              })
              .then(() => {
                res.status(200).send({ message: "Password updated" });
              })
              .catch((err) => {
                return res.status(500).send({ message: err.message });
              });
          })
          .catch((err) => {
            return res.status(500).send({ message: err.message });
          });
      }
    });
  } else {
    return res.status(400).send({ message: "Something went wrong" });
  }
};

export { signup, activate, login, SendResetPassword, ResetPassword };
