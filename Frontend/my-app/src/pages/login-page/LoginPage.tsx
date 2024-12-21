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

import {
  BASE_URL,
  checkAndThrowError,
  emailValidation,
  passwordValidation,
} from '../../utils/shared';
import { emailRegex } from '../../utils/shared';

import { useEffect, useState } from 'react';
import {
  storeUserId,
  updateIsAdmin,
  updateIsUserLoggedIn,
  updateKeepLoggedIn,
} from '../../app/store';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from '../../utils/api-calls';

const LoginPage: React.FC = () => {
  const [showError, setShowError] = useState<any>({
    userNotFound: false,
    invalidCredentials: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const refreshToken = localStorage.getItem('refresh-token');

      if (refreshToken) {
        const decoded = jwtDecode<any>(refreshToken);
        const currentTime = Date.now() / 1000; // current time in seconds
        if (decoded.exp > currentTime) {
          const data = await getAccessToken();
          login(data, data.id);
        }
      }
    })();
  }, []);
  const login = (user: any, userId: string) => {
    localStorage.setItem('UserId', userId);
    localStorage.setItem('token', user.token);
    dispatch(storeUserId(userId));
    dispatch(updateIsUserLoggedIn(true));
    if (userId === import.meta.env.VITE_ADMIN_ID) {
      dispatch(updateIsAdmin(true));
    }
    navigate('/dashboard');
  };

  const onSubmit = async (data: any) => {
    const emailInput = data.email;
    const passwordInput = data.password;
    const fetchFn = await fetch(
      rememberMe
        ? `${BASE_URL}/users/email/${emailInput}?RememberMe=${true}`
        : `${BASE_URL}/users/email/${emailInput}`
    );
    if (fetchFn.ok) {
      const user = await fetchFn.json();
      const userData = user.userData;
      if (!user.userExists) {
        setShowError({ ...showError, userNotFound: true });
      } else {
        if (userData.password === passwordInput.trim()) {
          if (rememberMe && user.refreshToken) {
            localStorage.setItem('refresh-token', user.refreshToken);
            dispatch(updateKeepLoggedIn(true));
          }
          login(user, userData._id);
        } else {
          setShowError({ ...showError, invalidCredentials: true });
        }
      }
    }
  };

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
            {...register('email', emailValidation)}
            onChange={(e) =>
              setShowError({
                userNotFound: false,
                invalidCredentials: false,
              })
            }
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
              ...register('password', passwordValidation),
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
