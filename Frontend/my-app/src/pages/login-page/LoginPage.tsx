import LoginSignupLayout from '../../components/login-signup-layout/LoginSignupLayout';
import illustration from '../../assets/images/Illustration-login-page.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  InputBootstrapStyled,
  SignupLoginBtn,
} from '../../utils/styled-components';
import { FormControl, FormGroup, InputAdornment } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from '../../utils/form-styles.module.css';
import PasswordField from '../../components/PasswordField';
import { useForm } from 'react-hook-form';
import { ReactJSX } from '@emotion/react/dist/declarations/src/jsx-namespace';
import { checkAndThrowError } from '../../utils/shared';
import { emailRegex } from '../../utils/shared';
import { boolean } from 'yup';
import { useEffect, useState } from 'react';
import {
  setCallsHeader,
  updateIsAdmin,
  updateIsUserLoggedIn,
  updateKeepLoggedIn,
} from '../../app/store';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const LoginPage: React.FC = () => {
  const [showError, setShowError] = useState<any>({
    userNotFound: false,
    invalidCredentials: false,
  });
  const [userEmail, setUserEmail] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    const fetchFn = await fetch(
      rememberMe
        ? `http://localhost:3000/users/email/${data.email}?RememberMe=${true}`
        : `http://localhost:3000/users/email/${data.email}`
    );
    if (fetchFn.ok) {
      const user = await fetchFn.json();
      if (!user.userExists) {
        setShowError({ ...showError, userNotFound: true });
      } else {
        if (user.userData.password === data.password.trim()) {
          localStorage.setItem('UserId', user.userData._id);
          localStorage.setItem('token', user.token);
          if (rememberMe && user.refreshToken) {
            localStorage.setItem('refresh-token', user.refreshToken);
            dispatch(updateKeepLoggedIn(true));
          }
          dispatch(setCallsHeader(user.token));
          dispatch(updateIsUserLoggedIn(true));
          console.log(user.userData._id, import.meta.env.VITE_ADMIN_ID);
          if (user.userData._id === import.meta.env.VITE_ADMIN_ID) {
            dispatch(updateIsAdmin(true));
          }
          navigate('/dashboard');
        } else {
          setShowError({ ...showError, invalidCredentials: true });
        }
      }
    }
  };
  useEffect(() => {
    (async () => {
      const refreshToken = localStorage.getItem('refresh-token');

      if (refreshToken) {
        const decoded = jwtDecode<any>(refreshToken);
        const currentTime = Date.now() / 1000; // current time in seconds
        if (decoded.exp > currentTime) {
          const response = await fetch('http://localHost:3000/refresh-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: localStorage.getItem('refresh-token'),
            }),
          });
          const data = await response.json();
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('UserId', data.id);
          dispatch(setCallsHeader(data.accessToken));
          dispatch(updateIsUserLoggedIn(true));

          if (data.id === import.meta.env.VITE_ADMIN_ID) {
            dispatch(updateIsAdmin(true));
          }
          navigate('/dashboard');
        }
      }
    })();
  }, []);
  return (
    <LoginSignupLayout image={illustration}>
      <div className={styles.welcomeText}>
        <h1 className="poppins-semibold">Welcome Back</h1>
        <h2 className="poppins-regular">
          Sign in to continue to Budget Tracker
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} ${styles.gapTwenty}`}
      >
        <FormControl className={styles.formField}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <InputBootstrapStyled
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegex,
                message: 'Email is not valid',
              },
            })}
            onChange={(e) => {
              setUserEmail(e.target.value);
              setShowError({
                userNotFound: false,
                invalidCredentials: false,
              });
            }}
            fullWidth
            placeholder="test@exmaple.com"
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
          {checkAndThrowError(errors, 'email')}
        </FormControl>
        <FormControl className={styles.formField}>
          <label className={styles.label}>Password</label>
          <PasswordField
            formRegister={{
              ...register('password', { required: 'Password is required' }),
            }}
            checkAndThrowError={() => checkAndThrowError(errors, 'password')}
            changeHandler={() =>
              setShowError({ ...showError, invalidCredentials: false })
            }
          />

          <div className={styles.rememberForgetDiv}>
            <label className={`${styles.rememberBtn} poppins-regular`}>
              <input
                type="checkbox"
                onChange={(e) => setRememberMe(e.target.checked)}
              />{' '}
              Remember me{' '}
            </label>
            <Link
              className={`${styles.link} poppins-medium`}
              to="/forgot-password"
            >
              Forget Password
            </Link>
          </div>
        </FormControl>
        {showError.userNotFound && (
          <p className="errors poppins-regular">User not found</p>
        )}
        {showError.invalidCredentials && (
          <p className="errors poppins-regular">Invalid Credentials</p>
        )}
        <SignupLoginBtn
          className={styles.loginBtn}
          variant="contained"
          type="submit"
          // onClick={() => navigate('/dashboard')}
        >
          Log In
        </SignupLoginBtn>
        <p className={`${styles.signupLine} poppins-regular`}>
          Dont have an account?{' '}
          <Link className={`${styles.link} poppins-semibold`} to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </LoginSignupLayout>
  );
};

export default LoginPage;
