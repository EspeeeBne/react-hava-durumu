import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import Lottie from "react-lottie";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Box,
  Autocomplete,
} from "@mui/material";
import { WeatherContainer, WeatherInfo, PageContainer, StyledTextField, StyledButton, StyledSelect } from "./styles";
import sunnyAnimation from "./animations/sunny.json";
import rainyAnimation from "./animations/rainy.json";
import snowyAnimation from "./animations/snowy.json";
import cloudyAnimation from "./animations/cloudy.json";
import foggyAnimation from "./animations/foggy.json";
import thunderstormAnimation from "./animations/thunderstorm.json";
import drizzleAnimation from "./animations/drizzle.json";

const App = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [unit, setUnit] = useState("C");
  const [weatherData, setWeatherData] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [background, setBackground] = useState("default");
  const [animationData, setAnimationData] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const fetchWeather = async () => {
    try {
      const geoResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/weather/get-lat-lon`, {
        city,
        country,
      });
      if (!geoResponse.data) {
        alert("Geçerli bir şehir ve ülke adı girin.");
        return;
      }

      const { latitude, longitude } = geoResponse.data;
      setLatitude(latitude);
      setLongitude(longitude);

      const weatherResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/weather/get-weather`, {
        latitude: latitude,
        longitude: longitude,
        Unit: unit,
      });
      setWeatherData(weatherResponse.data);


      if (weatherResponse.data && weatherResponse.data.weathercode !== undefined) {
        const condition = weatherResponse.data.weathercode;
        if (condition === 0) {
          setBackground("sunny");
          setAnimationData(sunnyAnimation);
          setWeatherDescription("Güneşli");
        } else if (condition >= 1 && condition <= 3) {
          setBackground("cloudy");
          setAnimationData(cloudyAnimation);
          setWeatherDescription("Bulutlu");
        } else if (condition >= 45 && condition <= 48) {
          setBackground("foggy");
          setAnimationData(foggyAnimation);
          setWeatherDescription("Sisli");
        } else if (condition >= 51 && condition <= 67) {
          setBackground("drizzle");
          setAnimationData(drizzleAnimation);
          setWeatherDescription("Çiseleme");
        } else if (condition >= 71 && condition <= 77) {
          setBackground("snowy");
          setAnimationData(snowyAnimation);
          setWeatherDescription("Karlı");
        } else if (condition >= 80 && condition <= 82) {
          setBackground("rainy");
          setAnimationData(rainyAnimation);
          setWeatherDescription("Yağmurlu");
        } else if (condition >= 95 && condition <= 99) {
          setBackground("thunderstorm");
          setAnimationData(thunderstormAnimation);
          setWeatherDescription("Fırtınalı");
        } else {
          setBackground("default");
          setAnimationData(null);
          setWeatherDescription("Bilinmeyen");
        }
      } else {
        alert("Hava durumu bilgisi alınamadı. Lütfen bilgileri kontrol edin.");
      }
    } catch (error) {
      console.error("Error fetching weather data", error);
      alert("Hava durumu bilgisi alınamadı. Lütfen bilgileri kontrol edin.");
    }
  };

  const fetchCountrySuggestions = async (input) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?country=${input}&format=json&limit=5`
      );
      const newOptions = response.data.map((location) => ({
        label: location.display_name.split(",")[0],
        value: location,
      }));
      setCountryOptions(newOptions);
    } catch (error) {
      console.error("Error fetching country suggestions", error);
    }
  };

  const fetchCitySuggestions = async (input) => {
    if (!country) {
      alert("Öncelikle ülkeyi giriniz.");
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${input},${country}&format=json&limit=5`
      );
      const newOptions = response.data.map((location) => ({
        label: location.display_name.split(",")[0],
        value: location,
      }));
      setCityOptions(newOptions);
    } catch (error) {
      console.error("Error fetching city suggestions", error);
    }
  };

  return (
    <PageContainer background={background}>
      <Container maxWidth="sm" style={{ marginTop: "2rem", borderRadius: "15px" }}>
        <Typography variant="h4" gutterBottom>
          Hava Durumu Gösterici
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Autocomplete
            freeSolo
            options={countryOptions}
            onInputChange={(e, value) => {
              setCountry(value);
              fetchCountrySuggestions(value);
            }}
            renderInput={(params) => <StyledTextField {...params} label="Ülke" variant="outlined" />}
          />
          <Autocomplete
            freeSolo
            options={cityOptions}
            onInputChange={(e, value) => {
              setCity(value);
              fetchCitySuggestions(value);
            }}
            renderInput={(params) => <StyledTextField {...params} label="Şehir" variant="outlined" />}
          />
          <FormControl fullWidth>
            <InputLabel>Birim</InputLabel>
            <StyledSelect
              value={unit}
              label="Birim"
              onChange={(e) => setUnit(e.target.value)}
            >
              <MenuItem value="C">Celsius (°C)</MenuItem>
              <MenuItem value="F">Fahrenheit (°F)</MenuItem>
            </StyledSelect>
          </FormControl>
          <StyledButton variant="contained" color="primary" onClick={fetchWeather}>
            Hava Durumunu Getir
          </StyledButton>
        </Box>
        {weatherData && weatherData.weathercode !== undefined && (
          <WeatherContainer background={background}>
            <WeatherInfo>
              <Typography variant="h5">
                {city}, {country}
              </Typography>
              <Typography variant="h6">
                {weatherData.temperature} {unit === "C" ? "°C" : "°F"}
              </Typography>
              <Typography variant="subtitle1">
                Rüzgar Hızı: {weatherData.windspeed} km/s
              </Typography>
              <Typography variant="subtitle1">
                Durum: {weatherDescription}
              </Typography>
              {animationData && (
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={150}
                  width={150}
                />
              )}
            </WeatherInfo>
          </WeatherContainer>
        )}
      </Container>
    </PageContainer>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
