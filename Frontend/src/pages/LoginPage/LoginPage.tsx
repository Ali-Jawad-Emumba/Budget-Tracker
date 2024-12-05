import LoginSignupLayout from "../../components/LoginSignupLayout/LoginSignupLayout";
import illustration from "../../assets/images/Illustration-login-page.png";
import { Link, useNavigate } from "react-router-dom";
import {
  InputBootstrapStyled,
  SignupLoginBtn,
} from "../../utils/styled-components";
import { FormControl, FormGroup, InputAdornment } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import styles from "../../utils/form-styles.module.css";
import PasswordField from "../../components/PasswordField";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LoginSignupLayout image={illustration}>
      <div className={styles.welcomeText}>
        <h1 className="poppins-semibold">Welcome Back</h1>
        <h2 className="poppins-regular">
          Sign in to continue to Budget Tracker
        </h2>
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
        <FormControl>
          <p className={styles.label}>Password</p>
          <PasswordField />
        </FormControl>
        <div className={styles.rememberForgetDiv}>
          <label className={`${styles.rememberBtn} poppins-regular`}>
            <input type="checkbox" /> Remember me{" "}
          </label>
          <Link className={`${styles.link} poppins-medium`} to={""}>
            Forget Password
          </Link>
        </div>

        <SignupLoginBtn
          className={styles.loginBtn}
          variant="contained"
          onClick={() => navigate("/dashboard")}
        >
          Log In
        </SignupLoginBtn>
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

export default LoginPage;
