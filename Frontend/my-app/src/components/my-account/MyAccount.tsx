import { Button, FormControl } from '@mui/material';
import {
  DashboardButton,
  InputBootstrapStyled,
  SignupLoginBtn,
} from '../../utils/styled-components';
import ProfileCard from '../profile-details/ProfileCard';
import styles from './MyAccount.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserData } from '../../app/store';
import { headers } from '../../utils/shared';

const MyAccount = () => {
  const userData = useSelector((state: any) => state.userData);
  const { register, handleSubmit } = useForm({ defaultValues: userData });
  const dispatch = useDispatch();
  const userId = localStorage.getItem('UserId');
  const onSubmit = async (data: any) => {
    const updateDataFn = await fetch(`http://localHost:3000/users/${userId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
    const updatedData = await updateDataFn.json();
    dispatch(storeUserData(updatedData));
  };
  return (
    <ProfileCard heading="My Account">
      <div style={{ padding: '0 40px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.accountDetailDiv}>
            <h2>Name & Job</h2>
            <div className={styles.accountField}>
              <FormControl className={styles.widthThirtyPercent}>
                <label>First Name</label>
                <InputBootstrapStyled
                  {...register('firstname', { required: true })}
                />
              </FormControl>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Last Name</label>
                <InputBootstrapStyled
                  {...register('lastname', { required: true })}
                />
              </FormControl>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Job Title</label>
                <InputBootstrapStyled {...register('jobtitle')} />
              </FormControl>
            </div>
          </div>
          <div className={styles.accountDetailDiv}>
            <h2>About Me</h2>
            <div className={styles.accountField}>
              <FormControl fullWidth>
                <InputBootstrapStyled {...register('aboutme')} />
              </FormControl>
            </div>
          </div>

          <div className={styles.accountDetailDiv}>
            <h2>Address</h2>
            <div className={styles.accountField} style={{ flexWrap: 'wrap' }}>
              <FormControl className={styles.widthTwentyFivePercent}>
                <label>Street Address</label>
                <InputBootstrapStyled {...register('street')} />
              </FormControl>
              <FormControl className={styles.widthTwentyFivePercent}>
                <label>City</label>
                <InputBootstrapStyled {...register('city')} />
              </FormControl>
              <FormControl className={styles.widthTwentyFivePercent}>
                <label>State</label>
                <InputBootstrapStyled {...register('state')} />
              </FormControl>

              <FormControl className={styles.widthTwentyFivePercent}>
                <label>Zip Code</label>
                <InputBootstrapStyled {...register('zipcode')} />
              </FormControl>
              <FormControl style={{ width: '100%' }}>
                <label>Complete Address</label>
                <InputBootstrapStyled {...register('address')} />
              </FormControl>
            </div>
          </div>

          <div className={styles.accountDetailDiv}>
            <h2>Contact Info</h2>
            <div className={styles.accountField}>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Phone Number</label>
                <InputBootstrapStyled {...register('phone')} />
              </FormControl>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Email</label>
                <InputBootstrapStyled
                  {...register('email', { required: true })}
                />
              </FormControl>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Website URL</label>
                <InputBootstrapStyled {...register('url')} />
              </FormControl>
            </div>
          </div>
          <div className={styles.accountDetailDiv}>
            <h2>Bio</h2>
            <div className={styles.accountField}>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Date of Birth</label>
                <InputBootstrapStyled {...register('dob')} />
              </FormControl>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Eductaion</label>
                <InputBootstrapStyled {...register('education')} />
              </FormControl>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Gender</label>
                <InputBootstrapStyled {...register('gender')} />
              </FormControl>
            </div>
          </div>
          <div className={styles.accountDetailDiv} style={{ borderBottom: 0 }}>
            <h2>Financial Budget</h2>
            <div className={styles.accountField}>
              <FormControl className={styles.widthThirtyPercent}>
                <label>Budget</label>
                <InputBootstrapStyled
                  {...register('budgetlimit', { required: true })}
                />
              </FormControl>
            </div>
          </div>

          <div>
            <DashboardButton type="submit">Update</DashboardButton>
            <Button
              variant="text"
              sx={{ width: '100px', fontSize: '0.75rem', color: 'black' }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ProfileCard>
  );
};
export default MyAccount;
