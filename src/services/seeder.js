import db from "../models/index.js";
import csv from "csv-parser";
import fs from "fs";
import bycrpt from "bcrypt";

//init seeder role
const initRoles = () => {
  db.roles.findAll().then((data) => {
    if (data.length === 0) {
      db.roles.create({
        role_id: 1,
        role_name: "Super Admin",
      });
      db.roles.create({
        role_id: 2,
        role_name: "Admin CS",
      });
      db.roles.create({
        role_id: 3,
        role_name: "Admin Cashier",
      });
      db.roles.create({
        role_id: 4,
        role_name: "Admin Design",
      });
      db.roles.create({
        role_id: 5,
        role_name: "Admin Warehouse",
      });
      db.roles.create({
        role_id: 6,
        role_name: "Admin Production",
      });
      db.roles.create({
        role_id: 7,
        role_name: "Admin Tata Usaha",
      });
      db.roles.create({
        role_id: 8,
        role_name: "User",
      });
    }
  });
};

const initUserSeed = () => {
  db.users.findAll().then((data) => {
    if (data.length === 0) {
      db.users.create({
        user_name: "Super Admin",
        user_email: "admin@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 1,
        user_status: true,
        user_verify: true,
      });
      db.users.create({
        user_name: "Admin CS",
        user_email: "admincs@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 2,
        user_status: true,
        user_verify: true,
      });
      db.users.create({
        user_name: "Admin Cashier",
        user_email: "adminkasir@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 3,
        user_status: true,
        user_verify: true,
      });
      db.users.create({
        user_name: "User",
        user_email: "user@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 8,
        user_status: true,
        user_verify: true,
      });
    }
  });
};
const initProductMaterial = () => {
  db.product_materials.findAll().then((data) => {
    if (data.length === 0) {
      db.product_materials.create({
        product_material_id: 1,
        product_material_name: "Plastik Standing Pouche",
        product_material_description: "Plastik Standing Pouche",
      });
      db.product_materials.create({
        product_material_id: 2,
        product_material_name: "Plastik Standing Sachet",
        product_material_description: "Plastik Standing Sachet",
      });
    }
  });
};

const initProductFinishings = () => {
  db.product_finishings.findAll().then((data) => {
    if (data.length === 0) {
      db.product_finishings.create({
        product_finishing_id: 1,
        product_finishing_name: "Laminating Doff",
        product_finishing_description: "Laminating Doff for standing pouch",
      });
    }
  });
};

const initProductCategory = () => {
  db.product_categories.findAll().then((data) => {
    if (data.length === 0) {
      db.product_categories.create({
        product_category_id:"O",
        product_category_name: "Standing Pouch",
        product_category_description: "Standing Pouch", 
      });
    }
  });
};

const initJenisProduct = () => {
  db.jenis_products.findAll().then((data) => {
    if (data.length === 0) {
      db.jenis_products.create({
        jenis_product_id: 1,
        jenis_product_name: "Color Matte",
        jenis_product_description: "Standing Pouch Color Matte",
      });
    }
  });
};

const initProductSize = () => {
  db.product_sizes.findAll().then((data) => {
    if (data.length === 0) {
      db.product_sizes.create({
        product_size_id: 1,
        product_size_length: 10,
        product_size_width: 10,
        product_size_height: 10,
        product_size_height2: 10,
        product_size_length2: 10,
        product_size_width2: 10,
        product_size_shape: "Square",	
        product_size_description: "10x10x10x10x10x10 Square",
      });
    }
  });
};

// const initProduct = () => {
//   db.products.findAll().then((data) => {
//     if (data.length === 0) {
//       db.products.create({
//         product_id: 1,
//         product_name: "Standing Pouch",
//         product_category: "O",	
//         product_material: 1,
//         product_finishing: 1,
//         jenis_product: 1,
//         product_size: 1,
//         product_description: "Standing Pouch",
//         product_weight: 10,
//       });
//     }
//   });
// };


const initProvince = () => {
  db.province.findAll().then((data) => {
    if (data.length === 0) {
      fs.createReadStream("./src/data/province.csv")
        .pipe(csv())
        .on("data", (row) => {
          db.province.create({
            province_id: row.province_id,
            province: row.province,
          });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
        });
    }
  });
};

const initCity = () => {
  db.city.findAll().then((data) => {
    if (data.length === 0) {
      fs.createReadStream("./src/data/city.csv")
        .pipe(csv())
        .on("data", (row) => {
          db.city.create({
            city_id: row.city_id,
            province_id: row.province_id,
            type: row.type,
            city_name: row.city_name,
            postal_code: row.postal_code,
          });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
        });
    }
  });
};

const initDistrict = () => {
  db.subdistrict.findAll().then((data) => {
    if (data.length === 0) {
      fs.createReadStream("./src/data/subdistrict.csv")
        .pipe(csv())
        .on("data", (row) => {
          db.subdistrict.create({
            subdistrict_id: row.subdistrict_id,
            city_id: row.city_id,
            subdistrict_name: row.subdistrict_name,
            postal_code: row.postal_code,
          });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
        });
    }
  });
};

export { initRoles, initProvince, initCity, initDistrict, initProductMaterial, initProductFinishings, initProductCategory, initJenisProduct, initProductSize, initUserSeed  };
