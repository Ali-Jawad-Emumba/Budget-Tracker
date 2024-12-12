import { BellIcon } from '../../pages/dashboard/DashboardIcons';
import ProfilePic from '../../assets/images/person profile.png';
import Logo from '../Logo/Logo';
import styles from './ProfileAppBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileAppBar = () => {
  const navigate = useNavigate();
  let userData = useSelector((state: any) => state.userData);
  return (
    <div className={styles.barLayout}>
      <div className={styles.logoDiv} onClick={() => navigate('/dashboard')}>
        <Logo useFor="dashboard" />
      </div>
      <div className={styles.bellAndProfileDiv}>
        <BellIcon />
        <img
          className="app-bar-profile-pic"
          src={userData?.profilepic || ProfilePic}
        />
      </div>
    </div>
  );
};

export default ProfileAppBar;
