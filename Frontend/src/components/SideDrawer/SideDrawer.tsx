import { styled, Theme, CSSObject } from "@mui/material/styles";
import styles from "./SlideDrawer.module.css";
import {
  Drawer as MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Logo from "../Logo/Logo";
import logo from "../../assets/images/logo.png";
import { AnalysisIcon, ExpensesIcon, LogoutIcon } from "./DrawerIcons";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function SideDrawer({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const drawerItems = [
    {
      text: "Analysis",
      icon: <AnalysisIcon />,
      action: () => console.log("Analysis clicked"),
    },
    {
      text: "Expenses",
      icon: <ExpensesIcon />,
      action: () => console.log("Expenses clicked"),
    },
    { text: "Logout", icon: <LogoutIcon />, action: () => navigate("/") },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton>
          {open ? (
            <Logo useFor="dashboard" />
          ) : (
            <img src={logo} style={{ marginLeft: "auto", width: "60%" }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List className={styles.drawerItemsList}>
        {drawerItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: "block" }}
            onClick={item.action}
            className={styles.drawerItem}
          >
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
                className={styles.drawerItemIcon}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
                className={styles.drawerItemText}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
