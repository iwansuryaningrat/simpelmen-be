import swaggerAutogen from "swagger-autogen";

const outputFile = "./docs/swagger_output.json";
const endpointsFiles = [
    "./src/routes/auth.routes.js",
    "./src/routes/users.routes.js",
    "./src/routes/admin_cs.rotes.js",
];
swaggerAutogen(outputFile, endpointsFiles);
