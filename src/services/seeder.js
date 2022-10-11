import db from "../models/index.js";
import csv from "csv-parser";
import fs from "fs";

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

export { initRoles, initProvince, initCity, initDistrict };
