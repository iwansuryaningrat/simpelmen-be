import db from "../../models/index.js";
const User = db.user;
const Op = db.Sequelize.Op;
const Transaction = db.transaction;
const Product_detail = db.product_detail;
const Product = db.Product;
const Material = db.material;
const finishing = db.finishing;
const Size = db.size;
//import jwt 
import jwt from "jsonwebtoken";
const Product_Category = db.Product_Category;
const Status_Histories = db.Status_Histories;

const showProfile = (req, res) => {
  User.findOne({
    where: {
      user_id: req.userId,
    },
  }).then((users) => {
    res.status(200).send(users);
  });
};

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
const WarehouseTransaction = (req, res) => {
  Transaction.findAll({
      where: {
        status_history_id: {
          [Op.or]: [10,11],
          },
      },
      include: [
          {
              model: User,
              as: "user",
          },
          {
              model: Product,
              as: "product",
              include: [
                  {
                      model:finishing,
                      as:"finishing"
                  },
                  {
                      model:Product_detail,
                      as:"product_detail",
                      include:[
                          {
                              model:Material,
                              as:"material"
                          },
                          {
                              model:Product_Category,
                              as:"product_category"
                          },
                          {
                              model:Size, 
                              as:"size"
                          }
                      ]
                  },
              ]
          },
          {
              model:Status_Histories,
              as:"status_histories"

          }
      ],
  }).then((transaction) => {
      res.status(200).send(transaction);
  });
};
export { showProfile, updateProfile ,WarehouseTransaction };
