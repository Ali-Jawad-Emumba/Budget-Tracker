import styles from './Logo.module.css';
import logo from '../../assets/images/logo.png';
import { LogoProps } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

const Logo = ({ useFor }: LogoProps) => {
  const getClass = () => {
    switch (useFor) {
      case 'dashboard':
        return styles.logoDashboard;
      case 'profile':
        return styles.logoProfile;
      default:
        return styles.logoLoginSignup;
    }
  };
  return (
    <div
      className={
        getClass()
      }
    >
      <img src={logo} />
      <h3 className={`${styles.appName} poppins-semibold`}>Budget Tracker</h3>
    </div>
  );
};

export default Logo;
