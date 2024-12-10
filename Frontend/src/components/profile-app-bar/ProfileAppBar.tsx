import { BellIcon } from "../../pages/Dashboard/DashboardIcons";
import ProfilePic from "../../assets/images/person profile.png";
import Logo from "../Logo/Logo";
import styles from "./ProfileAppBar.module.css"

const ProfileAppBar = () => {
  return (
    <div
    className={styles.barLayout}
    >
      <Logo useFor="dashboard" />
      <div className={styles.bellAndProfileDiv}>
        <BellIcon />
        <img src={ProfilePic} width="40px" />
      </div>
    </div>
  );
};

export default ProfileAppBar;
