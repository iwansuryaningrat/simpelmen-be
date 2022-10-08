import swaggerAutogen from "swagger-autogen";

const outputFile = "./docs/swagger_output.json";
const endpointsFiles = ["./src/routes/auth.routes.js", "./src/routes/user.routes.js", "./src/routes/cashier.routes.js", "./src/routes/product.routes.js", "./src/routes/category.routes.js", "./src/routes/transaction.routes.js", "./src/routes/transactionDetail.routes.js"];

swaggerAutogen(outputFile, endpointsFiles);
