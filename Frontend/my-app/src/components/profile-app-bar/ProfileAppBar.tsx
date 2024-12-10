import { BellIcon } from '../../pages/Dashboard/DashboardIcons';
import ProfilePic from '../../assets/images/person profile.png';
import Logo from '../Logo/Logo';
import styles from './ProfileAppBar.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileAppBar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.barLayout}>
      <div className={styles.logoDiv} onClick={() => navigate('/dashboard')}>
        <Logo useFor="dashboard" />
      </div>
      <div className={styles.bellAndProfileDiv}>
        <BellIcon />
        <img src={ProfilePic} width="40px" />
      </div>
    </div>
  );
};

export default ProfileAppBar;
