import { useEffect, useState } from 'react';
import SideDrawer from '../../components/side-drawer/SideDrawer';
import styles from './Dashboard.module.css';
import DashboardAppBar from '../../components/dashboard-app-bar/AppBar';
import ExpenseDashboardContent from '../../components/dashboard-content/ExpenseDashboardContent';
import { useNavigate } from 'react-router-dom';
import { fetchUserData, startTokenCheckInterval } from '../../utils/shared';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserData } from '../../app/store';
import UsersDashboardContent from '../../components/dashboard-content/UsersDashboardContent';
import AnalysisDashboardContent from '../../components/dashboard-content/AnalysisDashboardContent';
import AppBar from '../../components/dashboard-app-bar/AppBar';

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const userData = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const selectedDashboardTab=useSelector((state:any)=>state.selectedDashboardTab)
 
  useEffect(() => {
    if (!userData) {
      (async () => {
        const data = await fetchUserData();
        dispatch(storeUserData({ ...data }));
      })();
    }
  }, []);

  

  return (
    <div className={styles.layout}>
      <SideDrawer open={open} />
      <div className={styles.appBarAndContent}>
        <AppBar toggleDrawer={toggleDrawer} useFor="dashboard"/>
        {selectedDashboardTab==="Analysis" && <AnalysisDashboardContent/>}
        {selectedDashboardTab==="Users" && <UsersDashboardContent/>}
        {selectedDashboardTab==="Expenses" && <ExpenseDashboardContent />}
      </div>
    </div>
  );
};

export default Dashboard;
