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
        user_name: "Admin Design",
        user_email: "admindesign@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 4,
        user_status: true,
        user_verify: true,
      });
      db.users.create({
        user_name: "Admin Warehouse",
        user_email: "admingudang@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 5,
        user_status: true,
        user_verify: true,
      });
      db.users.create({
        user_name: "Admin Produksi",
        user_email: "adminproduksi@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 6,
        user_status: true,
        user_verify: true,
      });
      db.users.create({
        user_name: "Admin Tu",
        user_email: "admintu@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 7,
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
      db.users.create({
        user_name: "Wahyu Widi Widayat",
        user_email: "widiw598@gmail.com",
        user_password: bycrpt.hashSync("12345abcde", 8),
        user_role_id: 8,
        user_status: true,
        user_verify: true,
        user_district: 512,
        user_address: "Pulosono",
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
        product_material_name: "Ivory 350 Gram",
        product_material_description: "Ivory 350 Gram",
      });
      db.product_materials.create({
        product_material_id: 3,
        product_material_name: "Ivory 310 Gram",
        product_material_description: "Ivory 310 Gram",
      });
      db.product_materials.create({
        product_material_id: 4,
        product_material_name: "Ivory 230 Gram",
        product_material_description: "Ivory 230 Gram",
      });
      db.product_materials.create({
        product_material_id: 5,
        product_material_name: "Duplex 350 Gram",
        product_material_description: "Duplex 350 Gram",
      });
      db.product_materials.create({
        product_material_id: 6,
        product_material_name: "Duplex 310 Gram",
        product_material_description: "Duplex 150 Gram",
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
      db.product_finishings.create({
        product_finishing_id: 2,
        product_finishing_name: "Laminasi Glossi",
        product_finishing_description: "Laminasi Glossi",
      });
      db.product_finishings.create({
        product_finishing_id: 3,
        product_finishing_name: "Laminating Doff",
        product_finishing_description: "Laminating Doff",
      });
      db.product_finishings.create({
        product_finishing_id: 4,
        product_finishing_name: "Tanpa Laminasi",
        product_finishing_description: "Tanpa Laminasi",
      });
    }
  });
};

const initProductCategory = () => {
  db.product_categories.findAll().then((data) => {
    if (data.length === 0) {
      db.product_categories.create({
        product_category_id:"O",
        product_category_name: "Standing Pouch, Dus Offset, Stiker",
        product_category_description: "Standing Pouch, Dus Offset, Stiker", 
      });
      db.product_categories.create({
        product_category_id:"S",
        product_category_name: "Sablon Plastik, Pouch, Dus",
        product_category_description: "Sablon Plastik, Pouch, Dus", 
      });
      db.product_categories.create({
        product_category_id:"K",
        product_category_name: "Karton",
        product_category_description: "Karton (K)", 
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
      db.jenis_products.create({
        jenis_product_id: 2,
        jenis_product_name: "Karton",
        jenis_product_description: "Standing Pouch Color Matte",
      });
      db.jenis_products.create({
        jenis_product_id: 3,
        jenis_product_name: "Dus Offset",
        jenis_product_description: "Jenis Kemasan Dus Offset",
      });
      db.jenis_products.create({
        jenis_product_id: 4,
        jenis_product_name: "Sablon Plastik, Pouch, Dus",
        jenis_product_description: "Jenis Kemasan Sablon Plastik, Pouch, Dus",
      });
      db.jenis_products.create({
        jenis_product_id: 5,
        jenis_product_name: "Stiker",
        jenis_product_description: "Jenis Kemasan Stiker",
      });
      db.jenis_products.create({
        jenis_product_id: 6,
        jenis_product_name: "Standing Pouch",
        jenis_product_description: "Jenis Kemasan Standing Pouch",
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
      db.product_sizes.create({
        product_size_id: 2,
        product_size_shape: "Oval",	
        product_size_description: "Oval",
      });
      db.product_sizes.create({
        product_size_id: 3,
        product_size_shape: "Kotak",	
        product_size_description: "Kotak",
      });
      db.product_sizes.create({
        product_size_id: 4,
        product_size_shape: "Custom",	
        product_size_description: "Custom",
      });
      db.product_sizes.create({
        product_size_id: 5,
        product_size_length: 10,
        product_size_width: 12,
        product_size_description: "10 x 12",
      });
      db.product_sizes.create({
        product_size_id: 6,
        product_size_length: 10,
        product_size_width: 15,
        product_size_description: "10 x 15",
      });
      db.product_sizes.create({
        product_size_id: 7,
        product_size_length: 12,
        product_size_width: 20,
        product_size_description: "12 x 20",
      });
      db.product_sizes.create({
        product_size_id: 8,
        product_size_length: 13,
        product_size_width: 20,
        product_size_description: "13 x 20",
      });
      db.product_sizes.create({
        product_size_id: 9,
        product_size_length: 14,
        product_size_width: 20,
        product_size_description: "14 x 20",
      });
      db.product_sizes.create({
        product_size_id: 10,
        product_size_length: 15,
        product_size_width: 22,
        product_size_description: "15 x 22",
      });
      db.product_sizes.create({
        product_size_id: 11,
        product_size_length: 16,
        product_size_width: 24,
        product_size_description: "12 x 24",
      });
      db.product_sizes.create({
        product_size_id: 12,
        product_size_length: 18,
        product_size_width: 26,
        product_size_description: "18 x 26",
      });
      db.product_sizes.create({
        product_size_id: 13,
        product_size_length: 20,
        product_size_width: 30,
        product_size_description: "20 x 30",
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
