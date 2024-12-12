import illustration from '../../assets/images/illustration-signup-page.png';
import { Link, useNavigate } from 'react-router-dom';
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
import { boolean } from 'yup';
import { useState } from 'react';

const SignupPage: React.FC = () => {
  const [showUserExisitsError, setShowUserExistsError] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const getSignupDataBody = (data: any) => {
    let result = {
      ...data,
      fathername: '',
      gender: '',
      phone: '',
      zipcode: '',
      education: '',
      dob: '',
      address: '',
      jobtitle: '',
      street: '',
      city: '',
      state: '',
      url: '',
      aboutme: '',
      profilepic: '',
    };
    delete result.confirmedpassword;
    return JSON.stringify(result);
  };

  const onSubmit = async (data: any) => {
    const fetchFn = await fetch('http://localhost:3000/getUserByEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email }),
    });
    const { userExists } = await fetchFn.json();
    if (userExists) {
      setShowUserExistsError(true);
    } else {
      const response = await fetch('http://localhost:3000/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: getSignupDataBody(data),
      });

      if (response.ok) {
        navigate('/');
      }
    }
  };

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
              {...register('firstname', { required: 'Name is required' })}
              placeholder="test@exmaple.com"
            />
            {checkAndThrowError(errors, 'firstname')}
          </FormControl>
          <FormControl sx={{ width: '50%' }}>
            <p className={styles.label}>Last Name</p>
            <InputBootstrapStyled
              fullWidth
              {...register('lastname', { required: 'Name is required' })}
              placeholder="test@exmaple.com"
            />
            {checkAndThrowError(errors, 'lastname')}
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
            onChange={() =>
              showUserExisitsError ? setShowUserExistsError(false) : null
            }
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
        <FormControl>
          <p className={styles.label}>Budget Limit</p>
          <InputBootstrapStyled
            fullWidth
            {...register('budgetlimit')}
            placeholder="Enter Amount"
          />
        </FormControl>
        {showUserExisitsError && (
          <p className="errors poppins-regular">
            This email is already registered
          </p>
        )}
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
