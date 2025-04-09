import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
// import iconWeather from "../public/images/weather.png";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const [city, setCity] = useState("Jakarta");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getBackgroundClass = (mainWeather) => {
    switch (mainWeather) {
      case "Clear":
        return "bg-yellow-200";
      case "Clouds":
        return "bg-gray-300";
      case "Rain":
        return "bg-blue-300";
      case "Snow":
        return "bg-blue-100";
      case "Thunderstorm":
        return "bg-purple-300";
      default:
        return "bg-slate-200";
    }
  };

  const fetchWeather = async (cityName) => {
    try {
      const resWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const resForecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      setWeather(resWeather.data);
      setForecast(resForecast.data.list.slice(0, 8)); // ambil 8 jam ke depan
    } catch (err) {
      console.error("Gagal ambil data cuaca:", err);
      alert("Kota tidak ditemukan.");
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const resWeather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const resForecast = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );

          setWeather(resWeather.data);
          setForecast(resForecast.data.list.slice(0, 8));
          setCity(resWeather.data.name);
        } catch (err) {
          console.error("Failed to fetch location automatically:", err);
        }
      },
      () => {
        alert("Failed to fetch location. Allow location access.");
      }
    );
  };

  useEffect(() => {
    fetchWeather(city);

    const interval = setInterval(() => {
      fetchWeather(city);
    }, 600000); // 10 menit

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${getBackgroundClass(
        weather?.weather[0]?.main
      )} min-h-screen flex items-center justify-center transition-colors duration-500`}
    >
      {/* // <div className="bg-slate-200 min-h-screen flex items-center justify-center"> */}
      <div className="bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm">
        {!loading && weather && (
          <h2 className="text-xl font-semibold">
            {weather.name}, {weather.sys.country}
          </h2>
        )}

        <div className="flex">
          <div className="flex border rounded items-center px-2 py-2 w-full">
            <FaSearch className="h-5 w-5" />
            <input
              type="text"
              placeholder="Enter City"
              className="pl-2 border-none focus:outline-none w-full"
              value={city}
              onChange={(e) => {
                const val = e.target.value;
                setCity(val);

                // Jika input dikosongkan, fetch data Jakarta
                if (val.trim() === "") {
                  fetchWeather("Jakarta");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && city.trim() !== "") {
                  fetchWeather(city);
                }
              }}
            />
          </div>
          <button
            onClick={getUserLocation}
            className="px-4 py-2 bg-blue-400 text-white ml-2 rounded hover:bg-blue-500"
          >
            <FaMapMarkerAlt />
          </button>
        </div>
        {loading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : (
          weather && (
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{weather.name}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather image"
                className="mx-auto h-40"
              />
              <p className="text-lg font-semibold">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-sm capitalize">
                {weather.weather[0].description}
              </p>

              <HourlyForecast forecast={forecast} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
