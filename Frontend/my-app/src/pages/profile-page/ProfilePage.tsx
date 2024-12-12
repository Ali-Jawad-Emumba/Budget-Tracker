import { Backdrop, Button, CircularProgress, Paper } from '@mui/material';
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
import { storeUserData } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserData, startUserIdCheckInterval } from '../../utils/shared';

const ProfilePage = () => {
  // const seletedProfileTab = useSelector(
  //   (state: any) => state.seletedProfileTab
  // );
  const [selectedProfileTab, setSelectedProfileTab] =
    useState<string>('Profile');
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.userData);
  const [isLoading, setIsLoading] = useState<boolean>(!userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      (async () => {
        const data = await fetchUserData();
        dispatch(storeUserData({ ...data }));
        setIsLoading(false);
      })();
    }
    const interval = startUserIdCheckInterval(navigate);
    return () => clearInterval(interval);
  }, []);

  if (isLoading)
    return (
      <Backdrop
        sx={(theme: { zIndex: { drawer: number } }) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

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
            <h2>
              {userData.firstname} {userData.lastname}
            </h2>
            {userData.jobtitle && <h3>{userData.jobtitle}</h3>}
          </div>

          <ul className={styles.contactDetails}>
            {userData.phone && (
              <li className={styles.contactDetailItem}>
                <PhoneIcon /> {userData.phone}
              </li>
            )}
            <li className={styles.contactDetailItem}>
              <MailIcon /> {userData.email}
            </li>
            {userData.city && (
              <li className={styles.contactDetailItem}>
                <LocationIcon /> {userData.city}
              </li>
            )}
            {userData.url && (
              <li className={styles.contactDetailItem}>
                <LinkIcon /> {userData.url}
              </li>
            )}
          </ul>
        </Paper>
        {selectedProfileTab === 'Profile' ? <ProfileDetails /> : <MyAccount />}
      </div>
    </div>
  );
};

export default ProfilePage;
