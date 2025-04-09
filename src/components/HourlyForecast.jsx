import React, { useRef } from "react";
// import iconWeather from "../../public/images/weather.png";
import "./HourlyForecast.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HourlyForecast = ({ forecast }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="mt-6 relative">
      <div
        ref={scrollRef}
        className="flex gap-4 mx-10 py-2 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {forecast && forecast.length > 0 ? (
          forecast.map((item, index) => {
            const time = new Date(item.dt * 1000).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={index}
                className="flex flex-col  items-center bg-blue-100 shadow-lg py-2 rounded px-4"
              >
                <p>{time}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="weather image"
                  className="w-10 mx-auto"
                />
                <p>{Math.round(item.main.temp)}°C</p>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">Loading forecast...</p>
        )}
      </div>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 bg-blue-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 justify-center flex items-center"
      >
        <FaChevronLeft className="w-4 w-4" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 bg-blue-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 justify-center flex items-center"
      >
        <FaChevronRight className="w-4 w-4" />
      </button>
    </div>
  );
};

export default HourlyForecast;
