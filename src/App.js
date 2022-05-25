import "./App.css";
import { useState, useEffect } from "react";
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
import SearchIcon from "@mui/icons-material/Search";
function App() {
  const [place, setPlace] = useState("imphal");
  const [placeInfo, setPlaceInfo] = useState({});

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=314e4364f8334a5997b45129222505&q=${place}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) =>
        setPlaceInfo({
          name: data.location.name,
          country: data.location.country,
          celcius: {
            current: data.current.temp_c,
            high: data.forecast.forecastday[0].day.maxtemp_c,
            low: data.forecast.forecastday[0].day.mintemp_c
          },
          condition: data.current.condition.text
        })
      );

    setPlace("");
  };

  console.log(process.env.REACT_APP_API_KEY)

  return (
    <div
      className="app"
      style={
        placeInfo.condition?.toLowerCase() === "clear" ||
        placeInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Clear})` }
          : placeInfo.condition?.includes("cloudy")
          ? { backgroundImage: `url(${Cloudy})` }
          : placeInfo.condition?.toLowerCase().includes("rainy")
          ? { backgroundImage: `url(${Rainy})` }
          : placeInfo.condition?.toLowerCase().includes("snow")
          ? { backgroundImage: `url(${Snow})` }
          : { backgroundImage: `url(${Overcast})` }
      }
    >
      <div className="search-input">
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <SearchIcon
          onClick={handleFetch}
          fontSize="large"
          className="search-button"
        />
      </div>
      <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.celcius?.current}° C</h1>
          <div className="condition-high-low">
            <h1>{placeInfo.condition}</h1>
            <h1>High : {placeInfo.celcius?.high}° C</h1>
            <h1>Low : {placeInfo.celcius?.low}° C</h1>
          </div>
        </div>
        <h2>
          {placeInfo.name}, {placeInfo.country}
        </h2>
      </div>
    </div>
  );
}

export default App;