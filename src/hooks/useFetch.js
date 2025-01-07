import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

const useFetch = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
      const response = await axios.get(url);

      setData(response.data);
      
      // Extract pagination metadata from headers
      const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
      const limit = params._limit || totalCount;
      const currentPage = params._page || 1;
      
      setMetadata({
        totalCount,
        currentPage,
        totalPages: Math.ceil(totalCount / limit)
      });

      setError(null);
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    loading, 
    error, 
    metadata,
    refetch: fetchData 
  };
};

export default useFetch;
