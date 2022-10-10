import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./docs/swagger_output.json" assert { type: "json" };
const app = express();
import bodyParser from "body-parser";
import csv from "csv-parser";
import fs from "fs";
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  cookieSession({
    name: "Simpelmen",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: "strict",
  })
);

// // database
import db from "./src/models/index.js";

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   initRole();
//   initProvince();
//   initCity();
//   initDistrict();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Server is Successfully Running..." });
});

// routes
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import superadminRoutes from "./src/routes/superadmin.routes.js";

authRoutes(app);
superadminRoutes(app);
userRoutes(app);
// set port, listen for requests
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//init seeder role
function initRole() {
  db.roles.create({
    role_id: 1,
    role_name: "super admin",
  });
  db.roles.create({
    role_id: 2,
    role_name: "admin kasir",
  });
  db.roles.create({
    role_id: 3,
    role_name: "admin customer",
  });
  db.roles.create({
    role_id: 4,
    role_name: "admin gudaang",
  });
  db.roles.create({
    role_id: 5,
    role_name: "admin design",
  });
  db.roles.create({
    role_id: 6,
    role_name: "admin produksi",
  });
  db.roles.create({
    role_id: 7,
    role_name: "admin tata usaha",
  });
  db.roles.create({
    role_id: 8,
    role_name: "user",
  });
}


function initProvince() {
  fs.createReadStream("./src/data/province.csv")
    .pipe(csv())
    .on("data", (row) => {
      db.province.create({
        province_id: row.province_id,
        province: row.province,
      });
    }
    )
    .on("end", () => {
      console.log("CSV file successfully processed");
    }
    );
}
function initCity() {
  fs.createReadStream("./src/data/city.csv")
    .pipe(csv())
    .on("data", (row) => {
      db.city.create({
        city_id: row.city_id,
        type: row.type,
        province_id: row.province_id,
        city_name: row.city_name,
        postal_code: row.postal_code,
      });
    }
    )
    .on("end", () => {
      console.log("CSV file successfully processed");
    }
    );
}
function initDistrict() {
  fs.createReadStream("./src/data/subdistrict.csv")
    .pipe(csv())
    .on("data", (row) => {
      db.subdistrict.create({
        subdistrict_id: row.subdistrict_id,
        province_id: row.province_id,
        city_id: row.city_id,
        type: row.type,
        subdistrict_name: row.subdistrict_name,
      });
    }
    )
    .on("end", () => {
      console.log("CSV file successfully processed");
    }
    );
}