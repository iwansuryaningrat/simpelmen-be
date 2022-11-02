import {
    getProvince,
    getCity,
    getSudistrict,
} from '../controllers/address.controllers.js';

import express from 'express';

const router = express.Router();

import headers from "../services/headers.services.js";

const AddressRoutes = (app) => {
  app.use(headers);

    router.get("/province", getProvince);
    router.get("/city", getCity);
    router.get("/district", getSudistrict);
    app.use("/api/", router);
};

export default AddressRoutes;