import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import search from "./assets/search.png";
const Weather = () => {
  const code = [
    {
      Clear:
        "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      Clouds:
        "https://images.unsplash.com/photo-1603437873662-dc1f44901825?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      Thunderstorm:
        "https://plus.unsplash.com/premium_photo-1664304434345-8b8e6b512532?q=80&w=2102&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      Rain: "https://images.unsplash.com/photo-1494798132658-27ee988ba44d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      Snow: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      Drizzle:
        "https://images.unsplash.com/photo-1556485689-33e55ab56127?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      Atmosphere:
        "https://plus.unsplash.com/premium_photo-1669613233573-4911a0a81c63?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  const isFetched = useRef(false);
  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (Position) => {
        const { latitude, longitude } = Position.coords;
        const Response = await axios.get(
          `https://weather-application-six-roan.vercel.app/api/v1/weather/location?latitude=${latitude}&longitude=${longitude}`
        );
        setWeather(Response.data);
      },
      (error) => console.log(error)
    );
  }, []);

  const fetchWeatherByCity = async () => {
    if (!city) return;
    const response = await axios.get(
      `https://weather-application-six-roan.vercel.app/api/v1/weather/city?city=${city}`
    );
    setWeather(response.data);

    setCity("");
  };
  const weatherCondition = weather?.weather[0]?.main;
  const matchedCondition = code.find((item) => item[weatherCondition]);
  const backgroundImage = matchedCondition
    ? matchedCondition[weatherCondition]
    : "https://images.unsplash.com/photo-1689206543425-7b7301760ba1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen text-white bg-gradient-to-r from-blue-400 to-purple-500"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="flex items-center lg:px-4 lg:py-3 text-black lg:rounded-lg lg:shadow-xl bg-white/30 backdrop-blur-md sm:h-[6%] sm:w-[50%] sm:text-5xl sm:rounded-xl sm:shadow-2xl  sm:justify-between sm:px-4 sm:top-[30%] sm:absolute lg:top-[25%] lg:w-[35%] md:text-3xl lg:text-2xl xl:text-xl">
        <input
          type="text"
          className="text-black bg-transparent outline-none sm:py-1 sm:px-2 placeholder-black/50 lg:py-3 lg:px-5"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeatherByCity()}
        />
        <button onClick={fetchWeatherByCity} className="cursor-pointer">
          <img src={search} alt="Search" className="w-5 h-5" />
        </button>
      </div>

      {weather && (
        <div className="text-center text-black lg:shadow-xl lg:rounded-lg lg:mt-[12%] lg:p-5 bg-white/30 backdrop-blur-md sm:mt-5 sm:w-[50%] sm:h-[20%] sm:px-[10%] sm:py-[7%] md:px-[5%] md:py-[2%] lg:w-[35%] lg:h-[45%] ">
          <div className="flex items-center justify-center gap-3 sm:mt-4 md:mt-2">
            <h1 className="font-bold lg:text-xl sm:text-7xl md:text-3xl xl:text-2xl">
              {weather.name}
            </h1>
            <h2 className="font-bold lg:text-2xl sm:text-8xl md:text-4xl xl:text-3xl">
              {weather.sys.country}
            </h2>
          </div>
          
          <h2 className="sm:mt-6 md:text-2xl lg:text-xl sm:text-8xl xl:text-2xl">
            {weather.weather[0].description}
          </h2>
          <p className="sm:mt-6 md:text-2xl lg:text-lg sm:text-8xl xl:text-2xl">
            🌡 {Math.floor(weather.main.temp)}°C
          </p>
          <p className="sm:mt-6 md:text-2xl sm:text-7xl lg:text-lg xl:text-2xl">
            🌬 {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
