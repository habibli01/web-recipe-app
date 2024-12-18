import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

const useFetch = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const queryString = Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== '')
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');

        const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useFetch;
