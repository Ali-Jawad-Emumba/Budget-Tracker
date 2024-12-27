import illustration from '../assets/images/illustration-reset-pswd-page.png';
import { Link, useNavigate } from 'react-router-dom';
import { InputBootstrapStyled } from '../utils/styled-components';
import { Button, FormControl, FormGroup, InputAdornment } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from '../../utils/form-styles.module.css';
import LoginSignupLayout from '../components/login-signup-layout/login-signup-layout';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sendPswdResetLink } from '../utils/api-calls';
import { Description } from '@mui/icons-material';
import Notification from '../components/notification/Notification';
import { checkResponseValidity } from '../utils/shared';

const ForgotPswdPage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: '',
    title: '',
    description: '',
  });
  const navigate = useNavigate();
  const passwordResetHandler = async () => {
    if (email) {
      const response = await sendPswdResetLink(email);
      if (checkResponseValidity(response)) {
        setSnackBar({
          open: true,
          useFor: 'add',
          title: 'Reset Link Send',
          description: 'Reset link has been send to your email',
        });
        setTimeout(() => {
          setSnackBar(null);
          navigate('/');
        }, 3000);
      }
    }
  };

  return (
    <>
      <LoginSignupLayout image={illustration}>
        <div className={styles.welcomeText}>
          <h1 className="poppins-semibold">Reset Password</h1>
          <h2 className="poppins-regular">
            Enter your email for a reset link.
          </h2>
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
            onClick={() => passwordResetHandler()}
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
      <Notification {...snackBar} />
    </>
  );
};

export default ForgotPswdPage;
