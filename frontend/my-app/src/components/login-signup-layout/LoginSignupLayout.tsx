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
        <div className={styles.formAndImage}>
          <div className={styles.formLoginLayout}>{children}</div>
          <hr className={styles.verticalLine}/>
          <div className={styles.illustration}>
            <img src={image} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignupLayout;