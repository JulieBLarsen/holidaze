import { useState, useEffect } from 'react';

// https://codesandbox.io/s/z20gn?file=/pages/index.js

/* export default function useLocalStorage(key, initialValue) {  if (typeof window === 'undefined') {
    return 'Window not defined, still on server';
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
} */

export default function useLocalStorage(key, initialValue) {
  if (typeof window === 'undefined') {
    return 'Window not defined, still on server';
  }
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function getAuth() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const authLocal = JSON.parse(localStorage.getItem('auth'));
    setAuth(authLocal);
  }, []);
  return [auth, setAuth];
}
export function getUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authLocal = JSON.parse(localStorage.getItem('auth'));
    setUser(authLocal.user);
  }, []);
  return [user, setUser];
}
export function getToken() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const authLocal = JSON.parse(localStorage.getItem('auth'));
    setToken(authLocal.jwt);
  }, []);
  return [token, setToken];
}
