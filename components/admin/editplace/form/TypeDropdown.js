import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../../../../constants/api';
import AuthContext from '../../../../context/AuthContext';

function TypeDropdown({ register }) {
  const [auth, setAuth] = useContext(AuthContext);
  const url = BASE_URL + 'places';
  const types = ['Room', 'Hotel', 'Cabin', 'House', 'Guesthouse', 'Apartment'];

  return (
    <div>
      <label
        htmlFor="type"
        className="mt-3 block text-sm font-medium text-gray-700">
        Type:
      </label>
      <select
        name="type"
        id="type"
        ref={register}
        className="w-full mt-1 py-2 px-3 pr-4 border outline-none border-gray-300  focus:border-primary rounded-md">
        {types.map((type, index) => (
          <option key={index} className="p-4 m-3">
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TypeDropdown;
