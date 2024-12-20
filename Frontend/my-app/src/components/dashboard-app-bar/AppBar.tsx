import { BellIcon, SubjectIcon } from '../../pages/dashboard/DashboardIcons';
import styles from './AppBar.module.css';
import profilePic from '../../assets/images/person profile.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../logo/Logo';

const AppBar = ({
  useFor,
  toggleDrawer,
}: {
  useFor: string;
  toggleDrawer?: any;
}) => {
  const navigate = useNavigate();
  let userData = useSelector((state: any) => state.userData);
  return (
    <div className={styles.bar}>
      <div
        className={useFor === 'dashboard' ? styles.appBarBtn : styles.logoDiv}
        onClick={
          useFor === 'dashboard' ? toggleDrawer : () => navigate('/dashboard')
        }
      >
        {useFor === 'dashboard' ? <SubjectIcon /> : <Logo useFor="dashboard" />}
      </div>
      <div className={styles.bellIconAndProfile}>
        <BellIcon />
        <img
          className="app-bar-profile-pic"
          src={userData?.profilepic || profilePic}
          onClick={() => {
            if (useFor === 'dashboard') navigate('/profile');
          }}
        />
      </div>
    </div>
  );
};

export default AppBar;
