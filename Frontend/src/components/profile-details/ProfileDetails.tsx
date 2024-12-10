import { Paper } from "@mui/material";
import styles from "./ProfileDetails.module.css";
import ProfileCard from "./ProfileCard";

const ProfileDetails = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <ProfileCard heading="About Me">
        <div className={styles.aboutMeDetail}>
          <p className="poppins-regular">
            Passionate UI/UX designer with over 5 years of experience in
            creating user-friendly and visually appealing digital experiences.
            Skilled in wireframing, prototyping, and user research to deliver
            intuitive designs. Committed to enhancing user satisfaction through
            innovative and effective design solutions.
          </p>
        </div>
      </ProfileCard>
      <ProfileCard heading="Personal Details">
        <div className={styles.personalDetails}>
          <div>
            <h2>Full Name</h2>
            <h2>Micheal Johnson</h2>
          </div>
          <div>
            <h2>Father Name</h2>
            <h2>Micheal Johnson</h2>
          </div>
          <div>
            <h2>Gender</h2>
            <h2>Male</h2>
          </div>
          <div>
            <h2>Phone</h2>
            <h2>(684) 555-0102</h2>
          </div>
          <div>
            <h2>Email</h2>
            <h2>tim.jennings@example.com</h2>
          </div>
          <div>
            <h2>Zip Code</h2>
            <h2>123455</h2>
          </div>
          <div>
            <h2>Education</h2>
            <h2>Master</h2>
          </div>
          <div>
            <h2>Date of Birth</h2>
            <h2>26 Oct 2019</h2>
          </div>
          <div>
            <h2>Address</h2>
            <h2>4140 parker Rd. Allentown, New Mexico 31134</h2>
          </div>
          <div>
            <h2>Budget Limit</h2>
            <h2>30000 PKR</h2>
          </div>
        </div>
      </ProfileCard>
    </div>
  );
};

export default ProfileDetails;
