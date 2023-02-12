import { useEffect, useState } from "react";
import axios from 'axios';

export const useAxiosGetForWeather = (country) => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [weatherLoaded, setWeatherLoaded] = useState(false);
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/temperature/${country}`)
        .then((response) => setWeatherData(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setWeatherLoaded(true));
    }, [country]);
  
    return { weatherData, error, weatherLoaded };
  };

  export const useAxiosGetForCarbon = (country) => {
    const [carbonData, setcarbonData] = useState(null);
    const [error, setError] = useState("");
    const [carbonLoaded, setCarbonLoaded] = useState(false);
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/carbon/${country}`)
        .then((response) => setcarbonData(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setCarbonLoaded(true));
    }, [country]);
  
    return { carbonData, error, carbonLoaded };
  };

  export const useAxiosGetForForestry = (country) => {
    const [forestryData, setForestryData] = useState(null);
    const [error, setError] = useState("");
    const [forestryLoaded, setForestryLoaded] = useState(false);
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/forestry/${country}`)
        .then((response) => setForestryData(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setForestryLoaded(true));
    }, [country]);
  
    return { forestryData, error, forestryLoaded };
  };
