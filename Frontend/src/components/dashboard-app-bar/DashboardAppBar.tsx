import { BellIcon, SubjectIcon } from "../../pages/Dashboard/DashboardIcons";
import styles from "./DashboardAppBar.module.css";
import profilePic from "../../assets/images/person profile.png";
import { useNavigate } from "react-router-dom";

const DashboardAppBar = ({ toggleDrawer }: { toggleDrawer: any }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.bar}>
      <div className={styles.appBarBtn} onClick={toggleDrawer}>
        <SubjectIcon />
      </div>
      <div className={styles.bellIconAndProfile}>
        <BellIcon />
        <img
          width="40px"
          src={profilePic}
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

export default DashboardAppBar;
