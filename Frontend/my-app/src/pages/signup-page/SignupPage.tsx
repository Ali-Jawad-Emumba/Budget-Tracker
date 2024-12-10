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

const SignupPage: React.FC = () => {
  return (
    <LoginSignupLayout image={illustration}>
      <div className={styles.welcomeText}>
        <h1 className="poppins-semibold">Sign Up</h1>
        <h2 className="poppins-regular">Welcome to our community</h2>
      </div>
      <FormGroup className={`${styles.form} ${styles.gapTen}`}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <FormControl sx={{ width: '50%' }}>
            <p className={styles.label}>First Name</p>
            <InputBootstrapStyled fullWidth placeholder="test@exmaple.com" />
          </FormControl>
          <FormControl sx={{ width: '50%' }}>
            <p className={styles.label}>Last Name</p>
            <InputBootstrapStyled fullWidth placeholder="test@exmaple.com" />
          </FormControl>
        </div>
        <FormControl>
          <p className={styles.label}>Email</p>
          <InputBootstrapStyled
            fullWidth
            placeholder="test@exmaple.com"
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl>
          <p className={styles.label}>Password</p>
          <PasswordField />
        </FormControl>
        <FormControl>
          <p className={styles.label}>Confirm Password</p>
          <PasswordField />
        </FormControl>
        <FormControl>
          <p className={styles.label}>Budget Limit</p>
          <InputBootstrapStyled fullWidth placeholder="Enter Amount" />
        </FormControl>

        <SignupLoginBtn className={styles.loginBtn} variant="contained">
          Sign Up
        </SignupLoginBtn>
        <p className={`${styles.signupLine} poppins-regular`}>
          Already have an account?{' '}
          <Link className={`${styles.link} poppins-semibold`} to="/">
            Log In
          </Link>
        </p>
      </FormGroup>
    </LoginSignupLayout>
  );
};

export default SignupPage;
