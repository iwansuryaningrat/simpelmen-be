import swaggerAutogen from "swagger-autogen";

const outputFile = "./docs/swagger_output.json";
const endpointsFiles = [
    "./src/routes/auth.routes.js",
    "./src/routes/users.routes.js",
    "./src/routes/address.routes.js",
    "./src/routes/order.routes.js",
    "./src/routes/products.routes.js",
];
swaggerAutogen(outputFile, endpointsFiles);
