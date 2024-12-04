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

export const PurpleButton = styled(Button)(() => ({
  backgroundColor: "rgba(117, 57, 255, 1)",
}));
