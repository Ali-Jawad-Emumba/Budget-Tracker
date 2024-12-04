import { LoginSignupLayoutProp } from "../../utils/types";
import styles from "./LoginSignupLayout.module.css";
import logo from "../../assets/images/logo.png";

const LoginSignupLayout: React.FC<LoginSignupLayoutProp> = ({
  image,
  children,
}: LoginSignupLayoutProp) => {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.logo}>
          <img src={logo} />
          <h3 className={`${styles.appName} poppins-semibold`}>
            Budget Tracker
          </h3>
        </div>
        <div className={styles.formLoginLayout}>{children}</div>
        <div className={styles.illustration}>
          <img src={image} />
        </div>
      </div>
    </>
  );
};

export default LoginSignupLayout;
