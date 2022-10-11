import swaggerAutogen from "swagger-autogen";

const outputFile = "./docs/swagger_output.json";
const endpointsFiles = [
    "./src/routes/superadmin.routes.js",
    "./src/routes/auth.routes.js",
    "./src/routes/user.routes.js"
];
swaggerAutogen(outputFile, endpointsFiles);
