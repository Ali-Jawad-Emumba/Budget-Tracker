import { IconButton } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
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
  const interval = setInterval(
    () => checkTokenExpiration(keepLoggedIn),
    300000
  );
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
          const getNewAccessToken = async () => {
            const response = await getAccessToken();
            localStorage.setItem('token', response.data.token);
          };
          getNewAccessToken();
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

export const fetchDashboardData = (
  fetchFn: any,
  data: any,
  setToken: any,
  setTokenCheckInterval: any
) => {
  const fetchData = async () => await fetchFn();
  fetchData();
  setTimeout(() => {
    if (!data || data.length === 0) {
      const interval = setInterval(
        () => setToken(localStorage.getItem('token')),
        2000
      );
      setTokenCheckInterval(interval);
    }
  }, 3000);
};


export const checkResponseValidity = (response: any) => {
  if (response && response.status >= 200 && response.status < 300) {
    return true;
  } else return false;
};