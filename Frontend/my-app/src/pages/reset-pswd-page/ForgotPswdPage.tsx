import illustration from '../../assets/images/illustration-reset-pswd-page.png';
import { Link } from 'react-router-dom';
import { InputBootstrapStyled } from '../../utils/styled-components';
import { Button, FormControl, FormGroup, InputAdornment } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from '../../utils/form-styles.module.css';
import LoginSignupLayout from '../../components/login-signup-layout/LoginSignupLayout';
import { useState } from 'react';
import { headers } from '../../utils/shared';

const ForgotPswdPage: React.FC = () => {
  const [email, setEmail] = useState<string>();

  const sendPswdResetLink = async () => {
    if (email) {
      await fetch('http://localHost:3000/reset-password', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email,
        }),
      });
    }
  };
  return (
    <LoginSignupLayout image={illustration}>
      <div className={styles.welcomeText}>
        <h1 className="poppins-semibold">Reset Password</h1>
        <h2 className="poppins-regular">Enter your email for a reset link.</h2>
      </div>
      <FormGroup className={`${styles.form} ${styles.gapTwenty}`}>
        <FormControl>
          <p className={styles.label}>Email</p>
          <InputBootstrapStyled
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@exmaple.com"
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          className={styles.loginBtn}
          variant="contained"
          onClick={sendPswdResetLink}
        >
          Send Reset Password Link
        </Button>
        <p className={`${styles.signupLine} poppins-regular`}>
          Dont have an account?{' '}
          <Link className={`${styles.link} poppins-semibold`} to="/signup">
            Signup
          </Link>
        </p>
      </FormGroup>
    </LoginSignupLayout>
  );
};

export default ForgotPswdPage;
