import { useNavigate } from 'react-router-dom';

export const checkAndThrowError = (errors: any, errorFor: string): any => {
  if (errors[errorFor])
    return (
      <div className="errors poppins-regular">
        {(errors[errorFor] as any)?.message}
      </div>
    );
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const startUserIdCheckInterval = (navigate: any) => {
  const interval = setInterval(() => {
    const userId = localStorage.getItem('UserId');
    if (!userId) navigate('/');
  }, 5000);
  return interval;
};

export const fetchUserData = async () => {
  const userId = localStorage.getItem('UserId');
  const fetchFn = await fetch(`http://localHost:3000/users/${userId}`);
  const response = await fetchFn.json();
  const data = response;
  return data;
};
