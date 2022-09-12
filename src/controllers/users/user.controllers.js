import jwt from "jsonwebtoken";
import db from "../../models/index.js";
const User = db.user;
const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const userProfile = (req, res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    User.findOne({
      where: {
        user_id: decoded.id,
      },
    }).then((user) => {
      res.status(200).send({
        user_id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    });
  });
};

export { userBoard, userProfile };
