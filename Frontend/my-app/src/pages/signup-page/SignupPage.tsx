import illustration from '../../assets/images/illustration-signup-page.png';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, FormGroup, InputAdornment } from '@mui/material';
import {
  InputBootstrapStyled,
  SignupLoginBtn,
} from '../../utils/styled-components';
import styles from '../../utils/form-styles.module.css';
import LoginSignupLayout from '../../components/login-signup-layout/LoginSignupLayout';
import PasswordField from '../../components/PasswordField';
import { useForm } from 'react-hook-form';
import { checkAndThrowError, emailRegex } from '../../utils/shared';
import { boolean } from 'yup';
import { useState } from 'react';
import SignUpForm from './SignUpForm';

const SignupPage: React.FC = () => {
  return (
    <LoginSignupLayout image={illustration}>
      <div className={styles.welcomeText}>
        <h1 className="poppins-semibold">Sign Up</h1>
        <h2 className="poppins-regular">Welcome to our community</h2>
      </div>
      <SignUpForm useFor="signup page"/>
    </LoginSignupLayout>
  );
};

export default SignupPage;
