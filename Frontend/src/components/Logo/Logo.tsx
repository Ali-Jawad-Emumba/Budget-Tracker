import styles from "./Logo.module.css";
import logo from "../../assets/images/logo.png";
import { LogoProps } from "../../utils/types";

const Logo = ({ useFor }: LogoProps) => {
  return (
    <div
      className={
        useFor === "dashboard" ? styles.logoDashboard : styles.logoLoginSignup
      }
    >
      <img src={logo} />
      <h3 className={`${styles.appName} poppins-semibold`}>Budget Tracker</h3>
    </div>
  );
};

export default Logo;
