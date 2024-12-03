import LoginSignupLayout from "../../components/LoginSignupLayout/LoginSignupLayout";
import illustration from "../../assets/images/illustration-signup-page.png";
import { Link } from "react-router-dom";
import { Button, FormControl, FormGroup, InputAdornment } from "@mui/material";
import { InputBootstrapStyled } from "../../styled-components";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import './SignupPage.css'

const SignupPage: React.FC = () => {
  return (
    <LoginSignupLayout image={illustration}>
      <div className="welcome-text">
        <h1 className="poppins-semibold">Sign Up</h1>
        <h2 className="poppins-regular">Welcome to our community</h2>
      </div>
      <FormGroup className="form-signup">
        <div style={{display:"flex", gap:"15px"}}>
        <FormControl sx={{ width: "50%" }}>
          <p className="label">First Name</p>
          <InputBootstrapStyled fullWidth placeholder="test@exmaple.com" />
        </FormControl>
        <FormControl sx={{ width: "50%" }}>
          <p className="label">Last Name</p>
          <InputBootstrapStyled fullWidth placeholder="test@exmaple.com" />
        </FormControl>
        </div>
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
        <FormControl>
          <p className="label">Confirm Password</p>
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
        <FormControl>
          <p className="label">Budget Limit</p>
          <InputBootstrapStyled
            fullWidth
            placeholder="Enter Amount"
          />
        </FormControl>
    
        <Button className="login-btn" variant="contained">
          Sign Up
        </Button>
        <p className="signup-line poppins-regular">
          Already have an account?{" "}
          <Link className="link poppins-semibold" to="/">
            Log In
          </Link>
        </p>
      </FormGroup>
    </LoginSignupLayout>
  );
};

export default SignupPage;
