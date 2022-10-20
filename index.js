import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./docs/swagger_output.json" assert { type: "json" };
const app = express();
import bodyParser from "body-parser";
import {
  initRoles,
  initProvince,
  initCity,
  initDistrict,
} from "./src/services/seeder.js";

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

// database
// import db from "./src/models/index.js";

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Sync database");
//   initRoles();
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
import userRoutes from "./src/routes/users.routes.js";
import adminCSRoutes from "./src/routes/admin_cs.rotes.js";
import jenisProductsRoutes from "./src/routes/jenis_products.routes.js";
import rolesRoutes from "./src/routes/roles.routes.js";
import Product from "./src/routes/products.routes.js";
import AddressRoutes from "./src/routes/address.routes.js";

adminCSRoutes(app);
authRoutes(app);
userRoutes(app);
jenisProductsRoutes(app);
rolesRoutes(app);
Product(app);
AddressRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
