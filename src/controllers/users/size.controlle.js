import db from "../../models/index.js";
const Size = db.size;

const showSize = (req, res) => {
  Size.findAll().then((sizes) => {
    res.status(200).send(sizes);
  });
};
const createSize = (req, res) => {
  Size.create({
    size_length: req.body.size_length,
    size_height: req.body.size_height,
    size_width: req.body.size_width,
    size_shape: req.body.size_shape,
    size_description: req.body.size_description,
  }).then((sizes) => {
    res.status(200).send({
      message: "Create Success",
      data: sizes,
    });
  });
};
const updateSize = (req, res) => {
  Size.update(
    {
      size_length: req.body.size_length,
      size_height: req.body.size_height,
      size_width: req.body.size_width,
      size_shape: req.body.size_shape,
      size_description: req.body.size_description,
    },
    {
      where: {
        size_id: req.params.size_id,
      },
    }
  ).then((sizes) => {
    res.status(200).send({
      message: "Update Success",
      data: sizes,
    });
  });
};
const deleteSize = (req, res) => {
  Size.destroy({
    where: {
      size_id: req.params.size_id,
    },
  }).then((sizes) => {
    res.status(200).send({
      message: "Delete Success",
      data: sizes,
    });
  });
};
const showSizeById = (req, res) => {
  Size.findOne({
    where: {
      size_id: req.params.size_id,
    },
  }).then((sizes) => {
    res.status(200).send(sizes);
  });
};
export { showSize, createSize, updateSize, deleteSize, showSizeById };
