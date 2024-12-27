import illustration from '../../assets/images/illustration-reset-pswd-page.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { InputBootstrapStyled } from '../utils/styled-components';
import { Button, FormControl, FormGroup, InputAdornment } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from '../../utils/form-styles.module.css';
import LoginSignupLayout from '../components/login-signup-layout/login-signup-layout';
import { useEffect, useState } from 'react';
import { checkAndThrowError, checkResponseValidity } from '../utils/shared';
import PasswordField from '../components/password-field';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { updateAccountPassword } from '../utils/api-calls';

const ResetPswdPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');
  const token: any = searchParams.get('token');
  const [tokenExpired, setTokenExpired] = useState<boolean>(
    Boolean(localStorage.getItem('reset-token'))
  );
  const onSubmit = async (data: any) => {
    const response = await updateAccountPassword({ email, data });
    if (checkResponseValidity(response)) {
      navigate('/');
    }
  };
  useEffect(() => {
    localStorage.setItem('reset-token', token);
    const decoded = jwtDecode<any>(token);
    const currentTime = Date.now() / 1000; // current time in seconds
    const interval = setInterval(() => {
      if (decoded.exp < currentTime) {
        // Token has expired as seconds are decoded.exp-currentTime<0
        localStorage.removeItem('reset-token');
        setTokenExpired(true);
      }
    }, 300000);
    return () => clearInterval(interval);
  }, [token]);
  if (tokenExpired) {
    return <p>This Link is Expired</p>;
  } else {
    return (
      <LoginSignupLayout image={illustration}>
        <div className={styles.welcomeText}>
          <h1 className="poppins-semibold">Reset Password</h1>
          <h2 className="poppins-regular">Enter your new password.</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.form} ${styles.gapTwenty}`}
        >
          <FormControl>
            <p className={styles.label}>Password</p>
            <PasswordField
              formRegister={{
                ...register('password', { required: 'Password is required' }),
              }}
              checkAndThrowError={() => checkAndThrowError(errors, 'password')}
            />
          </FormControl>

          <FormControl>
            <p className={styles.label}>Confirm Password</p>
            <PasswordField
              formRegister={{
                ...register('confirmedpassword', {
                  required: 'Password is required',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                }),
              }}
              checkAndThrowError={() =>
                checkAndThrowError(errors, 'confirmedpassword')
              }
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </form>
      </LoginSignupLayout>
    );
  }
};

export default ResetPswdPage;
