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

const DesignTransaction = (req, res) => {
  Transaction.findAll({
      where: {
          transaction_status: {
              [Op.or]: [{[Op.like]: "Menunggu Persetujuan Design"}, {[Op.like]: "Design Ditolak"}],
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
      ],
  }).then((transaction) => {
      res.status(200).send(transaction);
  });
};
const DesignTransactionUpdateId = (req, res) => {
  Transaction.update(
    {
      transaction_status: "Design Diterima dan Dalam Proses",
    },
    {
      where: {
        transaction_id: req.params.transaction_id,
      },
    }
  ).then((transaction) => {
    res.status(200).send({
      message: "Update Success",
      data: transaction,
    });
  });
};
export { showProfile, updateProfile, DesignTransaction ,DesignTransactionUpdateId};
