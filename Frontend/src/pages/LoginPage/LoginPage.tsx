import LoginSignupLayout from "../../components/LoginSignupLayout/LoginSignupLayout";
import illustration from "../../assets/images/Illustration-login-page.png";
import { Link } from "react-router-dom";
import { InputBootstrapStyled } from "../../styled-components";
import { Button, FormControl, FormGroup, InputAdornment } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <LoginSignupLayout image={illustration}>
      <div className="welcome-text">
        <h1 className="poppins-semibold">Welcome Back</h1>
        <h2 className="poppins-regular">
          Sign in to continue to Budget Tracker
        </h2>
      </div>
      <FormGroup className="form-login">
        <FormControl>
          <p className="label">Email</p>
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
          <p className="label">Password</p>
          <InputBootstrapStyled
            fullWidth
            placeholder="Enter your password"
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="remember-forget-div">
          <label className="remember-btn poppins-regular">
            <input type="checkbox" /> Remember me{" "}
          </label>
          <Link className="link poppins-medium" to={""}>
            Forget Password
          </Link>
        </div>

        <Button className="login-btn" variant="contained">
          Log In
        </Button>
        <p className="signup-line poppins-regular">
          Dont have an account?{" "}
          <Link className="link poppins-semibold" to="/signup">
            Signup
          </Link>
        </p>
      </FormGroup>
    </LoginSignupLayout>
  );
};

export default LoginPage;
