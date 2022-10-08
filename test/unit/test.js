// import jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";

// dotenv.config();

// const secret = "secret";

// const token = jwt.sign({ id: 1 }, secret, { expiresIn: 60 * 60 });

// console.log(token);

// const decoded = jwt.verify(token, secret);

// console.log(decoded);

import "dotenv/config";
console.log(process.env.JWT_SECRET);
