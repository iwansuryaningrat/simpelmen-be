import db from "../../models/index.js";
const User = db.user;
const Op = db.Sequelize.Op;

const updateProfile = (req, res) => {
  User.update(
    {
      username: req.body.username,
      email: req.body.email,
    },
    {
      where: {
        user_id: req.userId,
      },
    }
  ).then((users) => {
    res.status(200).send({
      message: "Update Success",
      data: users,
    });
  });
};
export { showProfile, updateProfile };
