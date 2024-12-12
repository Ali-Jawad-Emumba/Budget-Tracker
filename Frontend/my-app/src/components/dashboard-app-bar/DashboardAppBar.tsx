import { BellIcon, SubjectIcon } from '../../pages/dashboard/DashboardIcons';
import styles from './DashboardAppBar.module.css';
import profilePic from '../../assets/images/person profile.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardAppBar = ({ toggleDrawer }: { toggleDrawer: any }) => {
  const navigate = useNavigate();
  let userData = useSelector((state: any) => state.userData);
  return (
    <div className={styles.bar}>
      <div className={styles.appBarBtn} onClick={toggleDrawer}>
        <SubjectIcon />
      </div>
      <div className={styles.bellIconAndProfile}>
        <BellIcon />
        <img
          className="app-bar-profile-pic"
          src={userData?.profilepic || profilePic}
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

export default DashboardAppBar;
