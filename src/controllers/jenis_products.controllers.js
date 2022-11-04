import db from "../models/index.js";
const jenisProducts = db.jenis_products;
const Op = db.Sequelize.Op;
const Product = db.products;

// Create and Save a new jenisProduct
const createjenisProduct = (req, res) => {
  const { name, description } = req.body;

  // Validate request
  if (!name) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a jenisProduct
  const jenis_product = {
    jenis_product_name: name,
    jenis_product_description: description,
  };

  // Save jenisProduct in the database
  jenisProducts
    .create(jenis_product)
    .then((data) => {
      res.send({
        message: "Jenis Product was created successfully!",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the jenisProduct.",
      });
    });
};

// Retrieve all jenisProducts from the database.
const findAllJenisProduct = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  jenisProducts
    .findAll({ where: condition })
    .then((data) => {
      if (data == null) {
        return res.status(404).send({
          message: "Jenis Product not found",
        });
      }

      res.send({
        message: "Jenis Product was retrieved successfully!",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jenisProducts.",
      });
    });
};

// Find a single jenisProduct with an id
const findOneJenisProduct = (req, res) => {
  const { id } = req.params;

  // Validate request
  if (!id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  jenisProducts
    .findByPk(id)
    .then((data) => {
      if (data == null) {
        return res.status(404).send({
          message: "Jenis Product not found",
        });
      }

      res.send({
        message: "Jenis Product was retrieved successfully!",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving jenisProduct with id=" + id,
      });
    });
};

// Update a jenisProduct by the id in the request
const updateJenisProduct = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Validate request
  if (!id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  jenisProducts
    .update(
      {
        jenis_product_name: name,
        jenis_product_description: description,
      },
      {
        where: { jenis_product_id: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Jenis Product was updated successfully.",
        });
      } else {
        return res.status(500).send({
          message: `Cannot update jenisProduct with id=${id}!`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error updating jenisProduct with id=" + id,
      });
    });
};

// Delete a jenisProduct with the specified id in the request
const deleteOneJenisProduct = (req, res) => {
  const { id } = req.params;

  // Validate request
  if (!id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  jenisProducts
    .destroy({
      where: { jenis_product_id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Jenis Product was deleted successfully!",
        });
      } else {
        return res.status(500).send({
          message: `Cannot delete jenisProduct with id=${id}!`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete jenisProduct with id=" + id,
      });
    });
};

export { createjenisProduct, findAllJenisProduct, findOneJenisProduct, updateJenisProduct, deleteOneJenisProduct };
