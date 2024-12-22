import { useEffect, useState } from 'react';
import SideDrawer from '../../components/side-drawer/SideDrawer';
import styles from './Dashboard.module.css';

import ExpenseDashboardContent from '../../components/dashboard-content/ExpenseDashboardContent';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../utils/api-calls';
import { useDispatch, useSelector } from 'react-redux';
import { storeSelectedDashboardTab, storeUserData } from '../../app/store';
import UsersDashboardContent from '../../components/dashboard-content/UsersDashboardContent';
import AnalysisDashboardContent from '../../components/dashboard-content/AnalysisDashboardContent';
import AppBar from '../../components/app-bar/AppBar';
import { InitialState } from '../../utils/types';

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const userData = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const selectedDashboardTab = useSelector(
    (state: any) => state.selectedDashboardTab
  );
  const userId = useSelector((state: InitialState) => state.userId);
  useEffect(() => {
    if (!userData || Object.keys(userData).every((field) => !userData[field])) {
      const fetchAndStoreData = async () => {
        const data = await fetchUserData(userId);
        dispatch(storeUserData({ ...data }));
      };
      fetchAndStoreData();
    }
    dispatch(storeSelectedDashboardTab('Expenses'));
  }, []);

  return (
    <div className={styles.layout}>
      <SideDrawer open={open} />
      <div className={styles.appBarAndContent}>
        <AppBar toggleDrawer={toggleDrawer} useFor="dashboard" />
        {selectedDashboardTab === 'Analysis' && <AnalysisDashboardContent />}
        {selectedDashboardTab === 'Users' && <UsersDashboardContent />}
        {selectedDashboardTab === 'Expenses' && <ExpenseDashboardContent />}
      </div>
    </div>
  );
};

export default Dashboard;
