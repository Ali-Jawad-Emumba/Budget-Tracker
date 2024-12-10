import { Button } from "@mui/material";
import {
  DashboardButton,
  InputBootstrapStyled,
  SignupLoginBtn,
} from "../../utils/styled-components";
import ProfileCard from "../profile-details/ProfileCard";
import styles from "./MyAccount.module.css";

const MyAccount = () => (
  <ProfileCard heading="My Account">
    <div style={{ padding: "0 40px" }}>
      <div className={styles.accountDetailDiv}>
        <h2>Name & Job</h2>
        <div className={styles.accountField}>
          <div className={styles.widthThirtyPercent}>
            <label>First Name</label>
            <InputBootstrapStyled />
          </div>
          <div className={styles.widthThirtyPercent}>
            <label>Last Name</label>
            <InputBootstrapStyled />
          </div>
          <div className={styles.widthThirtyPercent}>
            <label>Job Title</label>
            <InputBootstrapStyled />
          </div>
        </div>
      </div>

      <div className={styles.accountDetailDiv}>
        <h2>Address</h2>
        <div className={styles.accountField} style={{ flexWrap: "wrap" }}>
          <div className={styles.widthTwentyFivePercent}>
            <label>Street Address</label>
            <InputBootstrapStyled />
          </div>
          <div className={styles.widthTwentyFivePercent}>
            <label>City</label>
            <InputBootstrapStyled />
          </div>
          <div className={styles.widthTwentyFivePercent}>
            <label>State</label>
            <InputBootstrapStyled />
          </div>

          <div className={styles.widthTwentyFivePercent}>
            <label>Zip Code</label>
            <InputBootstrapStyled />
          </div>
          <div style={{ width: "100%" }}>
            <label>Complete Address</label>
            <InputBootstrapStyled />
          </div>
        </div>
      </div>

      <div className={styles.accountDetailDiv}>
        <h2>Contact Info</h2>
        <div className={styles.accountField}>
          <div className={styles.widthFiftyPercent}>
            <label>Phone Number</label>
            <InputBootstrapStyled />
          </div>
          <div className={styles.widthFiftyPercent}>
            <label>Email</label>
            <InputBootstrapStyled />
          </div>
        </div>
      </div>
      <div className={styles.accountDetailDiv}>
        <h2>Bio</h2>
        <div className={styles.accountField}>
          <div className={styles.widthThirtyPercent}>
            <label>Date of Birth</label>
            <InputBootstrapStyled />
          </div>
          <div className={styles.widthThirtyPercent}>
            <label>Eductaion</label>
            <InputBootstrapStyled />
          </div>
          <div className={styles.widthThirtyPercent}>
            <label>Gender</label>
            <InputBootstrapStyled />
          </div>
        </div>
      </div>
      <div className={styles.accountDetailDiv} style={{ borderBottom: 0 }}>
        <h2>Financial Budget</h2>
        <div className={styles.accountField}>
          <div className={styles.widthThirtyPercent}>
            <label>Budget</label>
            <InputBootstrapStyled />
          </div>
        </div>
      </div>

      <div>
        <DashboardButton>Update</DashboardButton>
        <Button
          variant="text"
          sx={{ width: "100px", fontSize: "1.2rem", color: "black" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  </ProfileCard>
);

export default MyAccount;
