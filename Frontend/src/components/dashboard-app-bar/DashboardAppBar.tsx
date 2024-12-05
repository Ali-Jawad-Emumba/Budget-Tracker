import { BellIcon, SubjectIcon } from "../../pages/Dashboard/DashboardIcons";
import styles from "./DashboardAppBar.module.css";
import profilePic from "../../assets/images/person profile.png";

const DashboardAppBar = ({ toggleDrawer }: { toggleDrawer: any }) => {
  return (
    <div className={styles.bar}>
      <div className={styles.appBarBtn} onClick={toggleDrawer}>
        <SubjectIcon />
      </div>
      <div className={styles.bellIconAndProfile}>
        <BellIcon />
        <img src={profilePic} />
      </div>
    </div>
  );
};

export default DashboardAppBar;
