import db from "../models/index.js";
const Users = db.users;
import mailgun from "mailgun-js";
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
// Load .env file
import * as dotenv from "dotenv";
dotenv.config();

const signup = (req, res) => {
  const name_input = req.body.name;
  const email_input = req.body.email;
  const phone = req.body.phone;
  const password_input = req.body.password;

  // Validate request
  if (!name_input || !email_input || !password_input) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const token = jwt.sign(
    {
      email: email_input,
      name: name_input,
      password: password_input,
      phone: phone,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 1800,
    }
  );

  const html = fs.readFileSync("./src/views/email.html", "utf8");

  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
  const data = {
    from: "Admin <widiw598@gmail.com>",
    to: email_input,
    subject: "Email Verification",
    html : html.replace("{token}", token),
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.status(500).send({
        error: err.message,
      });
    }

    res.status(200).send({
      message: "Email has been sent",
    });
  });
};

const activate = (req, res) => {
  const { token } = req.params;
  const temp = token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(400).send({ message: "Incorrect or Expired link" });
      } else {
        const { name, email, password,phone} = decodedToken;
        Users.create({
          user_name: name,
          user_contact: phone,
          user_password: bcrypt.hashSync(password, 8),
          user_email: email,
          user_status: true,
          user_verify: true,
          user_role_id: 8,
        })
          .then((user) => {
            res.redirect("http://simpelmenok-dev.herokuapp.com/login");
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
      const refreshToken = jwt.sign(
        {
          user_id: user.user_id,
        },
        process.env.JWT_REFRESH,
        {
          expiresIn: 259200,
        }
      );
      res.status(200).send({
        message: "Login Success",
        data: {
          user_email: user.user_email,
          user_role_id: user.user_role_id,
          user_name: user.user_name,
          token: token,
          refreshToken: refreshToken,
        },
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

const SendResetPassword = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

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
      const html = fs.readFileSync("./src/views/reset-password.html", "utf8");
      const DOMAIN = process.env.MAILGUN_DOMAIN;
      const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: DOMAIN,
      });
      const data = {
        from: "Admin <widiw598@gmail.com>",
        to: email,
        subject: "Reset Password",
        html: html.replace("{token}", token),
      };

      mg.messages().send(data, function (error, body) {
        if (error) {
          return res.status(500).json({
            error: err.message,
          });
        }

        res.json({
          message: "Email has been sent",
        });
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

const ResetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Validate request
  if (!password) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(400).send({ message: "Incorrect or Expired link" });
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

const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  jwt.verify(token, process.env.JWT_REFRESH, (err, decodedToken) => {
    if (err) {
      return res.status(400).send({ message: "Incorrect or Expired link" });
    } else {
      const { user_id } = decodedToken;
      Users.findOne({
        where: {
          user_id: user_id,
        },
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          const newToken = jwt.sign(
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
              expiresIn: 86400, 
            }
          );
          const newRefreshToken = jwt.sign(
            {
              user_id: user.user_id,
            },
            process.env.JWT_REFRESH,
            
          );
          res.status(200).send({
            message: "Refresh Token Success",
            data: {
              user_email: user.user_email,
              user_role_id: user.user_role_id,
              user_name: user.user_name,
              token: newToken,
              refreshToken: newRefreshToken,
            },
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message,
          });
        });
    }
  });
};

export { signup, activate, login, SendResetPassword, ResetPassword , refreshToken};
