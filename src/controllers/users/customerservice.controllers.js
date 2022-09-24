import db from "../../models/index.js";
const User = db.user;
const Transaction = db.transaction;
const Op = db.Sequelize.Op;
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
const CustomerServiceTransaction = (req, res) => {
  Transaction.findAll({
      where: {
        status_history_id: {
          [Op.or]: [1,2],
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
// const TrackingOrder = (req, res) => {
//   Transaction.findAll({
//       where: {
//         transaction_id : req.params.id,
//       }
//   }).then((transaction) => {
//       Status_Histories.findAll({
//         where: {
//           status_history_id: {
//             [Op.lte]: transaction[0].status_history_id,
//           },
//         },
//       }).then((status) => {
//         res.status(200).send({
//           transaction: transaction,
//           status: status,
//         });
//       });
//   });
// };
const CustomerServiceTransactionUpdateId = (req, res) => {
  Transaction.update(
    {
      transaction_status: 2,
    },
    {
      where: {
        transaction_id: req.params.id,
      },
    }
  ).then((transaction) => {
    res.status(200).send({
      message: "Update Success",
      data: transaction,
    });
  });
};

const CustomerServiceTransactionPrice = (req, res) => {
  Transaction.findOne({
    where: {
      transaction_id: req.params.id,
    },
  }).then((transaction) => {
    Transaction.update(
      {
        transaction_price: req.body.transaction_price,
        transaction_total_price: transaction.transaction_quantity * req.body.transaction_price,
      },
      {
        where: {
          transaction_id: req.params.id,
        },
      }
    ).then((transaction) => {
      res.status(200).send({
        message: "Update Success",
        data: transaction,
      });
    });
  });
};
export { showProfile, updateProfile, CustomerServiceTransaction, CustomerServiceTransactionUpdateId, CustomerServiceTransactionPrice};

// no pesanan
// 001 itu id pesanan
// O itu kode category
// V11 bulan
// 2022 tahun