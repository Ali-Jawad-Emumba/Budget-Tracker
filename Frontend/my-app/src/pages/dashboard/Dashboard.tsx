import { useEffect, useState } from 'react';
import SideDrawer from '../../components/side-drawer/SideDrawer';
import styles from './Dashboard.module.css';
import DashboardAppBar from '../../components/dashboard-app-bar/DashboardAppBar';
import DashboardContent from '../../components/dashboard-content/DashboardContent';
import { useNavigate } from 'react-router-dom';
import { fetchUserData, startUserIdCheckInterval } from '../../utils/shared';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserData } from '../../app/store';

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userData) {
      (async () => {
        const data = await fetchUserData();
        dispatch(storeUserData({ ...data }));
      })();
    }
    const interval = startUserIdCheckInterval(navigate);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.layout}>
      <SideDrawer open={open} />
      <div className={styles.appBarAndContent}>
        <DashboardAppBar toggleDrawer={toggleDrawer} />
        <DashboardContent dataFor="Expenses" />
      </div>
    </div>
  );
};

export default Dashboard;
