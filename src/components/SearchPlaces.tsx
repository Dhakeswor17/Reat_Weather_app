import { useState } from "react";
import { Fab, TextField, Box, Typography, CircularProgress } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import axios from "axios";

import "./styles/searchPlaces.scss";

const API_KEY = "a1921e720d394776a0a200657250902";

const SearchPlaces = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch weather data
  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=yes`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Try another location.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  // Handle search by place name
  const handleSearch = () => {
    if (location) fetchWeather(location);
  };

  // Get current location
  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        () => setError("Location access denied.")
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="search-form">
      <Box component="section">
        <TextField
          id="outlined-basic"
          label="Enter Location"
          variant="outlined"
          placeholder="Enter city or country"
          value={location}
          onChange={handleInputChange}
          sx={{ margin: "10px" }}
        />
        <Fab variant="extended" onClick={handleSearch}
        sx={{backgroundColor:"#415980"}}
        >
          Search
        </Fab>
        <Fab variant="extended" 
        onClick={handleUseCurrentLocation}
         sx={{ marginLeft: "10px", backgroundColor:"#415980"}}>
          <NavigationIcon sx={{ mr: 1 }} />
          Use Current Location
        </Fab>

        {/* Show Loading */}
        {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}

        {/* Show Weather Data */}
        {weather && !loading && (
          <Box className="weather-info">
            <Typography variant="h5">{weather.location.name}, {weather.location.country}</Typography>
            <Typography variant="h6">Temperature: {weather.current.temp_c}°C</Typography>
            <Typography>Condition: {weather.current.condition.text}</Typography>
            <Typography>Humidity: {weather.current.humidity}%</Typography>
            <Typography>Wind Speed: {weather.current.wind_kph} km/h</Typography>
          </Box>
        )}

        {/* Show Error */}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </div>
  );
};

export default SearchPlaces;
