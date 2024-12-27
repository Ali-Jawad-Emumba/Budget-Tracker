import styles from './profile-details.module.css';
import ProfileCard from './profile-card';

import { useSelector } from 'react-redux';
import { InitialState } from '../../utils/types';

const ProfileDetails = () => {
  const userData = useSelector((state: InitialState) => state.userData);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ProfileCard heading="About Me">
        <div className={styles.aboutMeDetail}>
          <p className="poppins-regular">{userData.aboutme}</p>
        </div>
      </ProfileCard>
      <ProfileCard heading="Personal Details">
        <div className={styles.personalDetails}>
          <div>
            <h2>Full Name</h2>
            <h2>
              {userData?.firstname} {userData?.lastname}
            </h2>
          </div>
          <div>
            <h2>Father Name</h2>
            <h2>{userData?.fathername}</h2>
          </div>
          <div>
            <h2>Gender</h2>
            <h2>{userData?.gender}</h2>
          </div>
          <div>
            <h2>Phone</h2>
            <h2>{userData?.phone}</h2>
          </div>
          <div>
            <h2>Email</h2>
            <h2>{userData?.email}</h2>
          </div>
          <div>
            <h2>Zip Code</h2>
            <h2>{userData?.zipcode}</h2>
          </div>
          <div>
            <h2>Education</h2>
            <h2>{userData?.education}</h2>
          </div>
          <div>
            <h2>Date of Birth</h2>
            <h2>{userData?.dob}</h2>
          </div>
          <div>
            <h2>Address</h2>
            <h2>{userData?.address}</h2>
          </div>
          <div>
            <h2>Budget Limit</h2>
            <h2>{userData?.budgetlimit} PKR</h2>
          </div>
        </div>
      </ProfileCard>
    </div>
  );
};

export default ProfileDetails;
