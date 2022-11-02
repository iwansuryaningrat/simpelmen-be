import db from "../models/index.js";
const Province = db.province;
const City = db.city;
const SubDistrict = db.subdistrict;

// Load .env file
import * as dotenv from "dotenv";

dotenv.config();

// Retrieve all province from the database.
const getProvince = (req, res) => {
    Province.findAll()
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving province.",
        });
        });
    }

const getCity = (req, res) => {
    const { province_id } = req.query;
    City.findAll({
        where: {
            province_id: province_id,
        },
    })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving city.",
        });
        });
    }

const getSudistrict = (req, res) => {
    const { city_id } = req.query;
    SubDistrict.findAll({
        where: {
            city_id: city_id,
        },
    })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving subdistrict.",
        });
        });
    }

export { getProvince, getCity, getSudistrict };