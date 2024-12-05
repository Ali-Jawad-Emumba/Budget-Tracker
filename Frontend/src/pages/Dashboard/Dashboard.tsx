import { useState } from "react";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import styles from "./Dashboard.module.css";
import DashboardAppBar from "../../components/dashboard-app-bar/DashboardAppBar";
import DashboardContent from "../../components/dashboard-content/DashboardContent";

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
