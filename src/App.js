import "./App.css";
import axios from "axios";
import React, { useState } from "react";

const api = {
  key: "57c59a5fdfb71ef625b7b40bb4be70c4",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  const search = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => {
          setWeather(res.data);
          setQuery("");
          setError(false);
        })
        .catch((err) => {
          if (err) {
            setError(true);
          }
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${day} ${date} ${month} ${year} `;
  };
  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 20
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <main>
        <div className={error ? "search-box error-box" : "search-box"}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {error ? <div className="error-msg">Not a City</div> : ""}
        {typeof weather.main !== "undefined" && !error ? (
          <div>
            <div className="location-box">
              <div className="location">
                {" "}
                {weather.name}, {weather.sys.country}{" "}
              </div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather"> {weather.weather[0].main} </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
