const axios = require("axios");

const WEATHER_API = process.env.WEATHER_API;

const getWeatherbyLocation = async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude)
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching Weather data" });
  }
};

const getWeatherbyCityName = async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City name is required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching Weather data" });
  }
};

module.exports = { getWeatherbyLocation, getWeatherbyCityName };
