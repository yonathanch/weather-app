import "./App.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

function App() {
  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center">
      {/* card container */}
      <div className="bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm">
        <div className="flex">
          {/* input and search */}
          <div className="flex border rounded items-center px-2 py-2 w-full ">
            <FaSearch className="h-5 w-5" />
            <input
              type="text"
              placeholder="Enter City"
              className="pl-2 border-none focus:outline-none w-full"
            />
          </div>

          <button className="px-4 py-2  bg-blue-400 text-white ml-2 rounded hover:bg-blue-500">
            <FaMapMarkerAlt />
          </button>
        </div>
        {/* weather data display */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">JKT</h2>
          <p className="text-lg font-semibold">2 °C</p>
          <p className="text-sm capitalize">Cloudy</p>
        </div>
      </div>
    </div>
  );
}

export default App;
