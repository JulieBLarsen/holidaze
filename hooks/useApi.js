import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/api';
import AuthContext from '../context/AuthContext';
import useSWR from 'swr';
import { getToken } from '../hooks/useLocalStorage';

// DON'T NEED TO USE??

export function getStrapiURL(path = '') {
  return BASE_URL + path;
}

/* export function getData(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = getStrapiURL(path);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        setError(error.toString());
        console.log(error);
      });
  }, []);

  return { data, loading, error };
}
 */
export function fetchData(path) {
  const url = getStrapiURL(path);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(url, fetcher);

  return { data, error };
}
export function fetchAdminData(path) {
  const [token, setToken] = getToken();
  const url = getStrapiURL(path);

  const fetchWithToken = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => res.data);

  const { data, error } = useSWR(token ? url : null, fetchWithToken, {
    refreshInterval: 5000,
  });

  return { data, error };
}
