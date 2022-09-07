import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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
import userRoutes from "./src/routes/user.routes.js";
import cashierRoutes from "./src/routes/cashier.routes.js";
import customerserviceRoutes from "./src/routes/customerservice.routes.js";
authRoutes(app);
userRoutes(app);
cashierRoutes(app);
customerserviceRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
