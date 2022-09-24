import db from "../../models/index.js";
const User = db.user;
const Op = db.Sequelize.Op;
const Transaction = db.transaction;
const Product_detail = db.product_detail;
const Product = db.Product;
const Material = db.material;
const finishing = db.finishing;
const Size = db.size;
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
const CashierTransaction = (req, res) => {
  Transaction.findAll({
      where: {
        status_history_id: {
          [Op.or]: [3,4],
          },
      },
      include: [
          {
              model: User,
              as: "user",
              attributes: ["user_id", "username", "email"],
          },
          {
              model: Product,
              as: "product",
              include: [
                  {
                      model:finishing,
                      as:"finishing",
                      attributes: ["finishing_id", "finishing_name"],
                  },
                  {
                      model:Product_detail,
                      as:"product_detail",
                      attributes: ["product_detail_id", "product_detail_name"],
                      include:[
                          {
                              model:Material,
                              as:"material",
                              attributes: ["material_id", "material_name"],
                          },
                          {
                              model:Product_Category,
                              as:"product_category",
                              attributes: ["product_category_id", "product_category_name"],
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
              as:"status_histories",
              attributes: ["status_history_id", "status_history_name"],

          }
      ],
  }).then((transaction) => {
      res.status(200).send(transaction);
  });
};
export { showProfile, updateProfile , CashierTransaction };
