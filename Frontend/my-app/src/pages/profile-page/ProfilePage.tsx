import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Paper,
} from '@mui/material';
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
import { fetchUserData } from '../../utils/shared';
import AppBar from '../../components/dashboard-app-bar/AppBar';

const ProfilePage = () => {
  const [selectedProfileTab, setSelectedProfileTab] =
    useState<string>('Profile');
  const navigate = useNavigate();
  let userData = useSelector((state: any) => state.userData);
  const [isLoading, setIsLoading] = useState<boolean>(!userData);
  const dispatch = useDispatch();
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] =
    useState<boolean>(false);
  const [base64ProfilePic, setBase64ProfilePic] = useState<any>();
  const userId = localStorage.getItem('UserId');

  useEffect(() => {
    if (!userData) {
      (async () => {
        const data = await fetchUserData();
        console.log(data);
        dispatch(storeUserData({ ...data }));
        setIsLoading(false);
      })();
    }
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

  const convertProfilePicToBase64 = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64ProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const saveProfilePic = async () => {
    const updateDataFn = await fetch(`http://localHost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        profilepic: base64ProfilePic,
      }),
    });
    const updatedUserData = await updateDataFn.json();
    dispatch(storeUserData(updatedUserData));
    setBase64ProfilePic(null);
    setIsProfilePicModalOpen(false);
  };

  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.appBar}>
          <AppBar useFor="profile" />
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
              selectedProfileTab === 'My Account'
                ? styles.selectedProfileTab
                : ''
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
              <img
                onClick={() => setIsProfilePicModalOpen(true)}
                className={styles.profilePic}
                src={userData.profilepic || ProfilePic}
              />
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
          {selectedProfileTab === 'Profile' ? (
            <ProfileDetails />
          ) : (
            <MyAccount />
          )}
        </div>
      </div>
      <Dialog
        onClose={() => setIsProfilePicModalOpen(false)}
        open={isProfilePicModalOpen}
      >
        <DialogTitle>Change Profile Pic</DialogTitle>
        <DialogContent>
          <label>Select Profile Pic</label>
          {
            <Avatar
              alt="Remy Sharp"
              src={base64ProfilePic || userData.profilepic}
            />
          }
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => convertProfilePicToBase64(e.target.files[0])}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={saveProfilePic}
            style={{ marginTop: '10px' }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePage;
