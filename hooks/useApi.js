import axios from 'axios';
import { BASE_URL } from '../constants/api';
import useSWR from 'swr';
import { getToken } from '../hooks/useLocalStorage';

export function getStrapiURL(path = '') {
  return BASE_URL + path;
}

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
export function getNewEnquiries() {
  const { data, error } = fetchAdminData('enquiries?new=true');
  if (error) {
    console.log(error);
    return 'error';
  }
  if (!data) {
    return 'loading';
  }
  const enquiryLength = data.length;
  return enquiryLength;
}
