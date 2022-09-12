import db from "../models/index.js";
const Material = db.material;

const showAllMaterials = (req, res) => {
  Material.findAll().then((materials) => {
    res.status(200).send(materials);
  });
};
const showMaterial = (req, res) => {
  Material.findOne({
    where: {
      material_id: req.params.material_id,
    },
  }).then((materials) => {
    res.status(200).send(materials);
  });
};
const createMaterial = (req, res) => {
  Material.create({
    material_name: req.body.material_name,
    material_description: req.body.material_description,
  }).then((materials) => {
    res.status(200).send({
      message: "Create Success",
      data: materials,
    });
  });
};
const updateMaterial = (req, res) => {
  Material.update(
    {
      material_name: req.body.material_name,
      material_description: req.body.material_description,
    },
    {
      where: {
        material_id: req.params.material_id,
      },
    }
  ).then((materials) => {
    res.status(200).send({
      message: "Update Success",
      data: materials,
    });
  });
};
const deleteMaterial = (req, res) => {
  Material.destroy({
    where: {
      material_id: req.params.material_id,
    },
  }).then((materials) => {
    res.status(200).send({
      message: "Delete Success",
      data: materials,
    });
  });
};
export {
  showAllMaterials,
  showMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
