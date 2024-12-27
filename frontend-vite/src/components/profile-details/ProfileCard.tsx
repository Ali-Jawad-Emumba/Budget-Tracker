import { Paper } from "@mui/material";

const ProfileCard = ({
  heading,
  children,
}: {
  heading: string;
  children?: any;
}) => (
  <Paper
    sx={{
      width: "100%",
      display: "grid",
      borderRadius: "5px",
    }}
  >
    <div className="profile-card-heading">
      <h1>{heading}</h1>
    </div>
    {children}
  </Paper>
);

export default ProfileCard;
