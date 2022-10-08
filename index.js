import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./docs/swagger_output.json" assert { type: "json" };
const app = express();
import bodyParser from "body-parser";

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
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  cookieSession({
    name: "Simpelmen",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: "strict",
  })
);

// database
import db from "./src/models/index.js";

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Testing" });
});

// routes
import authRoutes from "./src/routes/auth.routes.js";
// import userRoutes from "./src/routes/user.routes.js";
// import cashierRoutes from "./src/routes/cashier.routes.js";
// import customerserviceRoutes from "./src/routes/customerservice.routes.js";
import adminRoutes from "./src/routes/superadmin.routes.js";
// import productRoutes from "./src/routes/production.routes.js";
// import designRoutes from "./src/routes/design.routes.js";
// import administrationRoutes from "./src/routes/administration.routes.js";
authRoutes(app);
// userRoutes(app);
// cashierRoutes(app);
// customerserviceRoutes(app);
adminRoutes(app);
// productRoutes(app);
// designRoutes(app);
// administrationRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
