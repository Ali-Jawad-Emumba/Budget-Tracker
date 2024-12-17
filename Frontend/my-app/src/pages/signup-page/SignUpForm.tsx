import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../utils/form-styles.module.css';
import { Button, FormControl, InputAdornment } from '@mui/material';
import {
  InputBootstrapStyled,
  SignupLoginBtn,
} from '../../utils/styled-components';
import { checkAndThrowError, emailRegex } from '../../utils/shared';
import PasswordField from '../../components/PasswordField';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const SignUpForm = ({
  useFor,
  defaultValues,
  setModalOpen,
  reloadData,
}: {
  useFor: string;
  defaultValues?: any;
  setModalOpen?: any;
  reloadData?:any
}) => {
  const [showUserExisitsError, setShowUserExistsError] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const isModal=useFor.includes("modal")
  

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
  const conditionalSize = isModal ? { width: '50%' } : {width:"100%"};

  const onSubmit = async (data: any) => {
    const urlGetUserByEmail = `http://localhost:3000/users/email/${data.email}`;
    const fetchFn = await fetch(urlGetUserByEmail);
    const { userExists } = await fetchFn.json();
    if (userExists && useFor !== 'edit modal') {
      setShowUserExistsError(true);
    } else {
      let response = await fetch(
        useFor === 'edit modal' ? urlGetUserByEmail : 'http://localhost:3000/users/',
        {
          method: useFor === 'edit modal' ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:
            useFor === 'modal' ? JSON.stringify(data) : getSignupDataBody(data),
        }
      );

      if (useFor === 'signup page' && response.ok) {
        navigate('/');
      }
      if (isModal){
        setModalOpen(false);
        reloadData()
      }
    }
  };
  return (
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
      <div style={isModal?{ display: 'flex', gap: '15px' } :{}}>
        <FormControl sx={conditionalSize}>
          <p className={styles.label}>Password</p>
          <PasswordField
            formRegister={{
              ...register('password', { required: 'Password is required' }),
            }}
            checkAndThrowError={() => checkAndThrowError(errors, 'password')}
          />
        </FormControl>
        {useFor === 'signup page' && (
          <FormControl sx={conditionalSize}>
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
        )}
        <FormControl sx={conditionalSize}>
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
      </div>
      {isModal && (
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button
            sx={{ width: '50%' }}
            variant="outlined"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" sx={{ width: '50%' }} variant="contained">
            Save
          </Button>
        </div>
      )}
      {useFor === 'signup page' && (
        <>
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
        </>
      )}
    </form>
  );
};
export default SignUpForm;
