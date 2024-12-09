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

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/dashboard');
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
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegex,
                message: 'Email is not valid',
              },
            })}
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
          />

          <div className={styles.rememberForgetDiv}>
            <label className={`${styles.rememberBtn} poppins-regular`}>
              <input type="checkbox" /> Remember me{' '}
            </label>
            <Link className={`${styles.link} poppins-medium`} to={''}>
              Forget Password
            </Link>
          </div>
        </FormControl>
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
