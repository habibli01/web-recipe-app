import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const useFetch = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const paramsRef = useRef(JSON.stringify(params));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}${endpoint}`, { 
          params: JSON.parse(paramsRef.current)
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, paramsRef.current]);

  return { data, loading, error };
};

export default useFetch; 