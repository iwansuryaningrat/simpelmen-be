import jwt from "jsonwebtoken";
import db from "../models/index.js";
const Users = db.users;

// Load .env file
import * as dotenv from "dotenv";
dotenv.config();

const isUserLogin = (req, res, next) => {
    const token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(401).send({
        message: "No token, authorization denied",
        });
    }
    
    else {
        try{
            //decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user_id = decoded.user_id;
            req.user_email = decoded.user_email;
            req.user_role_id = decoded.user_role_id;
            next();
        }
        catch(err){
            return res.status(401).send({
                message: "Token is not valid",
                errorMessages: err.message,
            });
        }
    }
};

export { isUserLogin };