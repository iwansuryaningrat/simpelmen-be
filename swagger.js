import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/auth.routes.js', './src/routes/user.routes.js', './src/routes/cashier.routes.js', './src/routes/customerservice.routes.js', './src/routes/superadmin.routes.js', './src/routes/production.routes.js', './src/routes/design.routes.js', './src/routes/administration.routes.js']

swaggerAutogen(outputFile, endpointsFiles)