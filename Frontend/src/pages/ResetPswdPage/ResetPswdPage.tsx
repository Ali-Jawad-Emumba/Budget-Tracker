import LoginSignupLayout from "../../components/LoginSignupLayout/LoginSignupLayout";
import illustration from "../../assets/images/illustration-reset-pswd-page.png";
import { Link } from "react-router-dom";
import { InputBootstrapStyled } from "../../utils/styled-components";
import { Button, FormControl, FormGroup, InputAdornment } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import styles from "../../utils/form-styles.module.css";

const ResetPswdPage: React.FC = () => {
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
            placeholder="test@exmaple.com"
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <Button className={styles.loginBtn} variant="contained">
          Send Reset Password Link
        </Button>
        <p className={`${styles.signupLine} poppins-regular`}>
          Dont have an account?{" "}
          <Link className={`${styles.link} poppins-semibold`} to="/signup">
            Signup
          </Link>
        </p>
      </FormGroup>
    </LoginSignupLayout>
  );
};

export default ResetPswdPage;
