import { jwtDecode } from 'jwt-decode';

export const checkAndThrowError = (errors: any, errorFor: string): any => {
  if (errors[errorFor])
    return (
      <p className="errors poppins-regular">
        {(errors[errorFor] as any)?.message}
      </p>
    );
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const startTokenCheckInterval = () => {
  const interval = setInterval(() => checkTokenExpiration(), 5000);
  return interval;
};

export const fetchUserData = async () => {
  const userId = localStorage.getItem('UserId');
  const fetchFn = await fetch(`http://localHost:3000/users/${userId}`, {
    method: 'GET',
    headers,
  });
  const response = await fetchFn.json();
  const data = response;
  return data;
};

export const headers = {
  'Content-Type': 'application/json',
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
};

export const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // No token found, user should be logged out
    return false;
  }

  try {
    const decoded = jwtDecode<any>(token);
    const currentTime = Date.now() / 1000; // current time in seconds
    if (decoded.exp < currentTime) {
      // Token has expired
      localStorage.removeItem('token'); // Clear the token from localStorage
      localStorage.removeItem('UserId'); // Optionally, clear other session data
      window.location.href = '/'; // Redirect to login or show expired message
      return false; // Token is expired, user is logged out
    }

    return true; // Token is still valid
  } catch (error) {
    // Invalid token or other error
    localStorage.removeItem('token');
    localStorage.removeItem('UserId');
    window.location.href = '/'; // Redirect to login page
    return false;
  }
};


