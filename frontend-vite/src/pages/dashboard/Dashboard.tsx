import { useEffect, useState } from "react";
import SideDrawer from "../../components/side-drawer/side-drawer";
import styles from "./Dashboard.module.css";

import ExpenseDashboardContent from "../../components/dashboard-content/expense-dashboard-content";
import { fetchUserData } from "../../utils/api-calls";
import { useDispatch, useSelector } from "react-redux";
import { storeSelectedDashboardTab, storeUserData } from "../../app/store";
import UsersDashboardContent from "../../components/dashboard-content/users-dashboard-content";
import AnalysisDashboardContent from "../../components/dashboard-content/analysis-dashboard-content";
import AppBar from "../../components/app-bar/app-bar";
import { InitialState } from "../../utils/types";

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
        const response = await fetchUserData(userId);
        dispatch(storeUserData({ ...response?.data }));
      };
      fetchAndStoreData();
    }
    dispatch(storeSelectedDashboardTab("Expenses"));
  }, []);

  return (
    <div className={styles.layout}>
      <SideDrawer open={open} />
      <div className={styles.appBarAndContent}>
        <AppBar toggleDrawer={toggleDrawer} useFor="dashboard" />
        {selectedDashboardTab === "Analysis" && <AnalysisDashboardContent />}
        {selectedDashboardTab === "Users" && <UsersDashboardContent />}
        {selectedDashboardTab === "Expenses" && <ExpenseDashboardContent />}
      </div>
    </div>
  );
};

export default Dashboard;
