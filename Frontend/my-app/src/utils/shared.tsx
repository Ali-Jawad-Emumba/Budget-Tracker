import { Snackbar } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

export const checkAndThrowError = (errors: any, errorFor: string): any => {
  if (errors[errorFor])
    return (
      <p className="errors poppins-regular">
        {(errors[errorFor] as any)?.message}
      </p>
    );
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const startTokenCheckInterval = (keepLoggedIn: boolean) => {
  const interval = setInterval(() => checkTokenExpiration(keepLoggedIn), 5000);
  return interval;
};

export const fetchUserData = async () => {
  const userId = localStorage.getItem('UserId');
  const fetchFn = await fetch(`http://localHost:3000/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response = await fetchFn.json();
  const data = response;
  return data;
};

export const checkTokenExpiration = (keepLoggedIn: boolean) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refresh-token');

  if (!token) {
    // No token found, user should be logged out
    return false;
  }

  try {
    const decoded = jwtDecode<any>(token);
    const currentTime = Date.now() / 1000; // current time in seconds
    if (decoded.exp < currentTime) {
      // Token has expired
      if (keepLoggedIn && refreshToken) {
        const decoded = jwtDecode<any>(refreshToken);
        const currentTime = Date.now() / 1000; // current time in seconds
        if (decoded.exp > currentTime) {
          (async () => {
            const response = await fetch(
              'http://localHost:3000/refresh-token',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  refreshToken: localStorage.getItem('refresh-token'),
                }),
              }
            );
            const data = await response.json();
            localStorage.setItem('token', data.token);
          })();
        }
      } else {
        localStorage.removeItem('token'); // Clear the token from localStorage
        localStorage.removeItem('UserId'); // Optionally, clear other session data
        if (!refreshToken) window.location.href = '/'; // Redirect to login or show expired message
        return false; // Token is expired, user is logged out}
      }

      return true; // Token is still valid
    }
  } catch (error) {
    // Invalid token or other error

    if (!refreshToken) window.location.href = '/'; // Redirect to login page
    return false;
  }
};

export const patternMessage = 'Only alphabets, spaces and hyphens allowed';
export const getCharactersMessage = (max: number) =>
  `Must not be longer than ${max} characters`;
export const requiredMessage = 'This field is required';
export const emailValidation = {
  required: requiredMessage,
  pattern: {
    value: emailRegex,
    message: 'Email is invalid',
  },
};
export const getMaxLengthValidation = (max: number) => ({
  value: max,
  message: getCharactersMessage(max),
});
export const patternValidation = {
  value: /^[a-zA-Z\s\-]+$/,
  message: patternMessage,
};
export const passwordValidation = {
  required: requiredMessage,
  maxLength: getMaxLengthValidation(8),
  pattern: patternValidation,
};
export const nameValidation = {
  required: requiredMessage,
  maxLength: getMaxLengthValidation(50),
  pattern: patternValidation,
};
