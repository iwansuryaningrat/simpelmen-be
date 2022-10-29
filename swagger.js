import swaggerAutogen from "swagger-autogen";

const outputFile = "./docs/swagger_output.json";
const endpointsFiles = [
    "./src/routes/users.routes.js",
    "./src/routes/order.routes.js",
    "./src/routes/admin_cs.rotes.js",
    "./src/routes/admin_kasir.routes.js",
    "./src/routes/admin_produksi.routes.js",
    "./src/routes/admin_tu.routes.js",
    "./src/routes/admin_warehouse.routes.js",
    "./src/routes/admin_desain.routes.js",
    "./src/routes/super_admin.routes.js",
];
swaggerAutogen(outputFile, endpointsFiles);
