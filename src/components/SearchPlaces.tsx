import { useState } from "react";
import { Fab, TextField, Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
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

  // Choose weather icon
  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes("sunny")) return <WbSunnyIcon fontSize="large" />;
    if (condition.toLowerCase().includes("cloud")) return <CloudIcon fontSize="large" />;
    if (condition.toLowerCase().includes("snow")) return <AcUnitIcon fontSize="large" />;
    return <CloudIcon fontSize="large" />;
  };

  return (
    <div className="search-container">
      <Box className="search-box">
        <TextField
          label="Enter Location"
          variant="outlined"
          placeholder="Enter city or country"
          value={location}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: "15px", backgroundColor: "white", borderRadius: "5px" }}
        />
        <div className="button-group">
          <Fab variant="extended" onClick={handleSearch} className="search-btn">
            Search
          </Fab>
          <Fab variant="extended" onClick={handleUseCurrentLocation} className="location-btn">
            <NavigationIcon sx={{ mr: 1 }} />
            Use Current Location
          </Fab>
        </div>

        {/* Show Loading */}
        {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}

        {/* Show Weather Data */}
        {weather && !loading && (
          <Card className="weather-card">
            <CardContent>
              <Typography variant="h5" className="location-text">
                {weather.location.name}, {weather.location.country}
              </Typography>
              <div className="weather-info">
                {getWeatherIcon(weather.current.condition.text)}
                <Typography variant="h6">{weather.current.condition.text}</Typography>
              </div>
              <Typography variant="h4" className="temperature-text">
                {weather.current.temp_c}°C
              </Typography>
              <Typography>Humidity: {weather.current.humidity}%</Typography>
              <Typography>Wind Speed: {weather.current.wind_kph} km/h</Typography>
            </CardContent>
          </Card>
        )}

        {/* Show Error */}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </div>
  );
};

export default SearchPlaces;
