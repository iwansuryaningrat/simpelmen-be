import swaggerAutogen from "swagger-autogen";

const outputFile = "./docs/swagger.json";
const endpointsFiles = [
    "./src/routes/users.routes.js",
    "./src/routes/order.routes.js",
    "./src/routes/admin/admin_cs.routes.js",
    "./src/routes/admin/admin_kasir.routes.js",
    "./src/routes/admin/admin_produksi.routes.js",
    "./src/routes/admin/admin_tu.routes.js",
    "./src/routes/admin/admin_warehouse.routes.js",
    "./src/routes/admin/admin_desain.routes.js",
    "./src/routes/admin/super_admin.routes.js",
    "./src/routes/products.routes.js",
    "./src/routes/product_finishings.routes.js",
    "./src/routes/product_materials.routes.js",
    "./src/routes/product_sizes.routes.js",
    "./src/routes/product_categories.routes.js",
    "./src/routes/jenis_products.routes.js",
];
swaggerAutogen(outputFile, endpointsFiles);
