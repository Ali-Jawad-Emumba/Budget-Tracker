import { LoginSignupLayoutProp } from '../../utils/types';
import styles from './LoginSignupLayout.module.css';

import Logo from '../logo/Logo';

const LoginSignupLayout: React.FC<LoginSignupLayoutProp> = ({
  image,
  children,
}: LoginSignupLayoutProp) => {
  return (
    <>
      <div className={styles.layout}>
        <Logo useFor="Login Signup" />
        <div className={styles.formLoginLayout}>{children}</div>
        <div className={styles.illustration}>
          <img src={image} />
        </div>
      </div>
    </>
  );
};

export default LoginSignupLayout;
