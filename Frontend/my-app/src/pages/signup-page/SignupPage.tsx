import illustration from '../../assets/images/illustration-signup-page.png';
import { Link } from 'react-router-dom';
import { FormControl, FormGroup, InputAdornment } from '@mui/material';
import {
  InputBootstrapStyled,
  SignupLoginBtn,
} from '../../utils/styled-components';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from '../../utils/form-styles.module.css';
import LoginSignupLayout from '../../components/login-signup-layout/LoginSignupLayout';
import PasswordField from '../../components/PasswordField';
import { useForm } from 'react-hook-form';
import { checkAndThrowError, emailRegex } from '../../utils/shared';

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <LoginSignupLayout image={illustration}>
      <div className={styles.welcomeText}>
        <h1 className="poppins-semibold">Sign Up</h1>
        <h2 className="poppins-regular">Welcome to our community</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} ${styles.gapTen}`}
      >
        <div style={{ display: 'flex', gap: '15px' }}>
          <FormControl sx={{ width: '50%' }}>
            <p className={styles.label}>First Name</p>
            <InputBootstrapStyled
              fullWidth
              {...register('first name', { required: 'Name is required' })}
              placeholder="test@exmaple.com"
            />
            {checkAndThrowError(errors, 'first name')}
          </FormControl>
          <FormControl sx={{ width: '50%' }}>
            <p className={styles.label}>Last Name</p>
            <InputBootstrapStyled
              fullWidth
              {...register('last name', { required: 'Name is required' })}
              placeholder="test@exmaple.com"
            />
            {checkAndThrowError(errors, 'last mame')}
          </FormControl>
        </div>
        <FormControl>
          <p className={styles.label}>Email</p>
          <InputBootstrapStyled
            fullWidth
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegex,
                message: 'Email is invalid',
              },
            })}
            placeholder="test@exmaple.com"
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
          {checkAndThrowError(errors, 'email')}
        </FormControl>
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
              ...register('confirmed password', {
                required: 'Password is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              }),
            }}
            checkAndThrowError={() =>
              checkAndThrowError(errors, 'confirmed password')
            }
          />
        </FormControl>
        <FormControl>
          <p className={styles.label}>Budget Limit</p>
          <InputBootstrapStyled
            fullWidth
            {...register('amount')}
            placeholder="Enter Amount"
          />
        </FormControl>

        <SignupLoginBtn
          className={styles.loginBtn}
          type="submit"
          variant="contained"
        >
          Sign Up
        </SignupLoginBtn>
        <p className={`${styles.signupLine} poppins-regular`}>
          Already have an account?{' '}
          <Link className={`${styles.link} poppins-semibold`} to="/">
            Log In
          </Link>
        </p>
      </form>
    </LoginSignupLayout>
  );
};

export default SignupPage;
