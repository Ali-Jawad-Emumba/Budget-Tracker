import { Button, FilledInput } from "@mui/material";
import { styled } from "@mui/material/styles";

export const InputBootstrapStyled = styled(FilledInput)(({ theme }) => ({
  width: "100%",
  boxSizing: "border-box",
  borderRadius: 4,
  "& .MuiInputBase-input": {
    position: "relative",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["background-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  "& .MuiInputAdornment-root": {
    margin: 0,
  },
  "&::before": {
    content: '"\\00a0"',
    borderBottom: "none",
  },
  "&::after": {
    borderBottom: "none",
  },
}));

export const SignupLoginBtn = styled(Button)(() => ({
  backgroundColor: "#7539FF",
  padding: "12px 8px",
  color: "white",
}));

export const DashboardButton = styled(Button)(() => ({
  backgroundColor: "#7539FF",
  width: "150px",
  height: "fit-content",
  color: "white",
  textTransform: "none",
  fontSize: "1.4rem",
}));
