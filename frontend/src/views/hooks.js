import { useEffect, useState } from "react";
import axios from 'axios';

export const useAxiosGet = (country) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/temperature/${country}`)
        .then((response) => setData(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setLoaded(true));
    }, [country]);
  
    return { data, error, loaded };
  };
