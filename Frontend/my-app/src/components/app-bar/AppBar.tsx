import { BellIcon, BellIconNotified, SubjectIcon } from '../../utils/icons';
import styles from './AppBar.module.css';
import profilePic from '../../assets/images/person profile.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../logo/Logo';
import { useState } from 'react';
import NotifictaionLists from '../notification-list/NotificationsList';
import { AppBarProps, InitialState } from '../../utils/types';

const AppBar = ({ useFor, toggleDrawer }: AppBarProps) => {
  const navigate = useNavigate();
  let userData = useSelector((state: InitialState) => state.userData);
  const notifictaions = useSelector((state: InitialState) => state.notifications);
  const [showNotificationsList, setShowNotificationsList] =
    useState<boolean>(false);
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
        {notifictaions.length > 0 ? (
          <div onClick={() => setShowNotificationsList(!showNotificationsList)}>
            <BellIconNotified />
          </div>
        ) : (
          <BellIcon />
        )}
        {showNotificationsList && (
          <NotifictaionLists
            setShowNotificationsList={setShowNotificationsList}
          />
        )}
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