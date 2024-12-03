import { LoginSignupLayoutProp } from "../../types";
import "./LoginSignupLayout.css";
import logo from "../../assets/images/logo.png";

const LoginSignupLayout: React.FC<LoginSignupLayoutProp> = ({
  image,
  children,
}: LoginSignupLayoutProp) => {
  return (
    <>
    
      <div className="layout">
      <div className="logo">
        <img src={logo} />
        <h3 className="app-name poppins-semibold">Budget Tracker</h3>
      </div>
        <div className="form-login-layout">
          {children}
        </div>
        <div className="illustration">
          <img src={image} />
        </div>
      </div>
    </>
  );
};

export default LoginSignupLayout;
