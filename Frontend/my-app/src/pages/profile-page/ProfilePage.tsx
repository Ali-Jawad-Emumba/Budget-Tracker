import { Button, Paper } from '@mui/material';
import ProfileAppBar from '../../components/profile-app-bar/ProfileAppBar';

import ProfilePic from '../../assets/images/person profile.png';
import styles from './ProfilePage.module.css';
import {
  ArrowBackIcon,
  LinkIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
} from './ProfilePageIcons';
import ProfileDetails from '../../components/profile-details/ProfileDetails';
import MyAccount from '../../components/my-account/MyAccount';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedProfileTab } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProfilePage = () => {
  // const seletedProfileTab = useSelector(
  //   (state: any) => state.seletedProfileTab
  // );
  const [selectedProfileTab, setSelectedProfileTab] =
    useState<string>('Profile');
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.pageLayout}>
      <div className={styles.appBar}>
        <ProfileAppBar />
      </div>

      <div className={styles.profileBar}>
        <div className={styles.profileDiv}>
          <div onClick={() => navigate('/dashboard')}>
            <ArrowBackIcon />
          </div>
          <h1>Profile</h1>
        </div>
        <p
          onClick={() => setSelectedProfileTab('Profile')}
          className={`${styles.profileTab} ${
            selectedProfileTab === 'Profile' ? styles.selectedProfileTab : ''
          }`}
        >
          Profile
        </p>
        <p
          onClick={() => setSelectedProfileTab('My Account')}
          className={`${styles.profileTab} ${
            selectedProfileTab === 'My Account' ? styles.selectedProfileTab : ''
          }`}
        >
          My Account
        </p>
      </div>

      <div className={styles.pageBody}>
        <Paper
          sx={{
            display: 'grid',
            gridTemplateRows: '40% 60%',
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '20px',
            maxHeight: '350px',
          }}
        >
          <div className={styles.userDetailsCard}>
            <img className={styles.profilePic} src={ProfilePic} />
            <h2>Cameron Williamson</h2>
            <h3>Project Manager</h3>
          </div>

          <ul className={styles.contactDetails}>
            <li className={styles.contactDetailItem}>
              <PhoneIcon /> (684) 555-0102
            </li>
            <li className={styles.contactDetailItem}>
              <MailIcon /> tim.jennings@exmaple.com
            </li>
            <li className={styles.contactDetailItem}>
              <LocationIcon /> New York
            </li>
            <li className={styles.contactDetailItem}>
              <LinkIcon /> www.websitename.com
            </li>
          </ul>
        </Paper>
        {selectedProfileTab === 'Profile' ? <ProfileDetails /> : <MyAccount />}
      </div>
    </div>
  );
};

export default ProfilePage;
