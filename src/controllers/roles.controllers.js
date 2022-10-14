import db from "../models/index.js";
const Roles = db.roles;
const Op = db.Sequelize.Op;

const getAll = (req, res) => {
  Roles.findAll()
    .then((data) => {
      res.send({
        message: "Roles successfully retrieved",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};

const getOne = (req, res) => {
  const { id } = req.params;

  // Validate request
  if (!id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Roles.findByPk(id)
    .then((data) => {
      res.send({
        message: "Roles successfully retrieved",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};

const create = (req, res) => {
  const { role_name } = req.body;

  // Validate request
  if (!role_name) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (role_name === "Super Admin") {
    return res.status(400).send({
      message: "Super Admin is not allowed to create!",
    });
  }

  // Create a User
  const role = {
    role_name,
  };

  // Save User in the database
  Roles.create(role)
    .then((data) => {
      res.send({
        message: "Roles successfully created",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating roles.",
      });
    });
};

const update = (req, res) => {
  const { id } = req.params;
  const { role_name } = req.body;

  // Validate request
  if (!id || !role_name) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (id === 1) {
    return res.status(400).send({
      message: "Super Admin can not be updated!",
    });
  }

  Roles.update(
    {
      role_name,
    },
    {
      where: { role_id: id },
    }
  )
    .then((data) => {
      res.send({
        message: "Roles successfully updated",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while updating roles.",
      });
    });
};

const remove = (req, res) => {
  const { id } = req.params;

  // Validate request
  if (!id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (id === 1) {
    return res.status(400).send({
      message: "Super Admin can not be deleted!",
    });
  }

  Roles.destroy({
    where: { role_id: id },
  })
    .then((data) => {
      res.send({
        message: "Roles successfully deleted",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while deleting roles.",
      });
    });
};

export { getAll, getOne, create, update, remove };
