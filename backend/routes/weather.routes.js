const express = require("express");
const { getWeatherbyLocation, getWeatherbyCityName } = require("../controllers/weather.controller");
const router = express.Router();


router.get("/location", getWeatherbyLocation);
router.get("/city", getWeatherbyCityName);

module.exports = router;
