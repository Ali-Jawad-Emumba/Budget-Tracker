import { IconButton, Snackbar } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from './api-calls';
import { CloseIcon } from './icons';

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
      // Token has expired as seconds are decoded.exp-currentTime<0
      if (keepLoggedIn && refreshToken) {
        const decoded = jwtDecode<any>(refreshToken);
        if (decoded.exp > currentTime) {
          (async () => {
            const data = await getAccessToken();
            localStorage.setItem('token', data.token);
          })();
        }
      } else {
        localStorage.removeItem('reset-token');
        localStorage.removeItem('token');
        localStorage.removeItem('UserId'); 
        window.location.href = '/'; 
        return false; 
      }

      return true; 
    }
  } catch (error) {
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
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CloseButton = ({ setIsOpen }: { setIsOpen: any }) => (
  <IconButton
    aria-label="close"
    onClick={() => setIsOpen(false)}
    sx={(theme) => ({
      position: 'absolute',
      right: 8,
      top: 8,
      color: theme.palette.grey[500],
    })}
  >
    <CloseIcon />
  </IconButton>
);
