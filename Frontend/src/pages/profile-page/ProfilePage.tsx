import { Link, Paper } from "@mui/material";
import ProfileAppBar from "../../components/profile-app-bar/ProfileAppBar";

import ProfilePic from "../../assets/images/person profile.png";
import styles from "./ProfilePage.module.css";
import {
  ArrowBackIcon,
  LinkIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
} from "./ProfilePageIcons";
import ProfileDetails from "../../components/profile-details/ProfileDetails";

const ProfilePage = () => {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.appBar}>
        <ProfileAppBar />
      </div>

      <div className={styles.profileBar}>
        <div className={styles.profileDiv}>
          <ArrowBackIcon />
          <h1>Profile</h1>
        </div>
        <div className={styles.profileTabs}>
          <Link
            sx={{
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "1.4rem",
              color: "#878a99",
              textDecoration: "none",
            }}
          >
            Profile
          </Link>
          <Link
            sx={{
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "1.4rem",
              color: "#878a99",
              textDecoration: "none",
            }}
          >
            My Account
          </Link>
        </div>
      </div>

      <div className={styles.pageBody}>
        <Paper
          sx={{
            display: "grid",
            gridTemplateRows: "40% 60%",
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "20px",
            maxHeight: "350px",
          }}
        >
          <div className={styles.userDetailsCard}>
            <img className={styles.profilePic} src={ProfilePic} />
            <h2>Cameron Williamson</h2>
            <h3>Project Manager</h3>
          </div>

          <ul className={styles.contactDetails}>
            <li className={styles.contactDetailItem}>
              <PhoneIcon /> (684) 555-0102
            </li>
            <li className={styles.contactDetailItem}>
              <MailIcon /> tim.jennings@exmaple.com
            </li>
            <li className={styles.contactDetailItem}>
              <LocationIcon /> New York
            </li>
            <li className={styles.contactDetailItem}>
              <LinkIcon /> www.websitename.com
            </li>
          </ul>
        </Paper>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default ProfilePage;
