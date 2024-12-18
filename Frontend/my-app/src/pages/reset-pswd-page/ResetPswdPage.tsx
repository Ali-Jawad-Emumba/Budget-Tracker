import illustration from '../../assets/images/illustration-reset-pswd-page.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { InputBootstrapStyled } from '../../utils/styled-components';
import { Button, FormControl, FormGroup, InputAdornment } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from '../../utils/form-styles.module.css';
import LoginSignupLayout from '../../components/login-signup-layout/LoginSignupLayout';
import { useState } from 'react';
import { checkAndThrowError, headers } from '../../utils/shared';
import PasswordField from '../../components/PasswordField';
import { useForm } from 'react-hook-form';

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
  const onSubmit = async (data: any) => {
    const response = await fetch(`http://localHost:3000/users/email/${email}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      navigate('/');
    }
  };
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
};

export default ResetPswdPage;
