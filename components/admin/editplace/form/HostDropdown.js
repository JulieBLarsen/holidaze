import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../../../../constants/api';
import AuthContext from '../../../../context/AuthContext';

function HostDropdown({ register }) {
  const [auth, setAuth] = useContext(AuthContext);

  const url = BASE_URL + 'hosts';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps */

  if (error) {
    <p>Can't load hosts</p>;
  }
  if (!data && !error) {
    <p>loading hosts...</p>;
  }

  return (
    <div>
      <label
        htmlFor="host"
        className="mt-3 block text-sm font-medium text-gray-700">
        Host:
      </label>
      <select
        name="host"
        id="host"
        ref={register}
        className="w-full mt-1 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md">
        {data.map((host) => (
          <option key={host.id} className="p-4 m-3">
            {host.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HostDropdown;
