import { styled, Theme, CSSObject } from '@mui/material/styles';
import styles from './side-drawer.module.css';
import {
  Drawer as MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import Logo from '../logo/logo';
import logo from '../../assets/images/logo.png';
import {
  AnalysisIcon,
  ExpensesIcon,
  LogoutIcon,
  UsersIcon,
} from '../../utils/icons';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerHeader } from '../../utils/styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  clearNotifications,
  storeSelectedDashboardTab,
  storeUserData,
  storeUserId,
  updateIsAdmin,
  updateIsUserLoggedIn,
  updateNotifications,
} from '../../app/store';

export default function SideDrawer({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDashboardTab, setSelectedDashboardTab] =
    useState<string>('Expenses');
  const isAdmin = useSelector((state: any) => state.isAdmin);
  const logout = () => {
    localStorage.removeItem('UserId');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    dispatch(storeUserId(null));
    dispatch(updateIsAdmin(false));
    dispatch(storeSelectedDashboardTab('Expenses'));
    dispatch(storeUserData(null));
    dispatch(updateIsUserLoggedIn(false));
    dispatch(clearNotifications());
    navigate('/');
  };

  const [drawerItems, setDrawerItems] = useState<any>([
    {
      text: 'Analysis',
      icon: <AnalysisIcon />,
      action: () => {
        dispatch(storeSelectedDashboardTab('Analysis'));
        setSelectedDashboardTab('Analysis');
      },
    },
    {
      text: 'Expenses',
      icon: <ExpensesIcon />,
      action: () => {
        dispatch(storeSelectedDashboardTab('Expenses'));
        setSelectedDashboardTab('Expenses');
      },
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      action: logout,
    },
  ]);

  useEffect(() => {
    if (isAdmin && drawerItems.every((item: any) => item.text !== 'Users')) {
      const adminDrawer = [...drawerItems];
      adminDrawer.splice(2, 0, {
        text: 'Users',
        icon: <UsersIcon />,
        action: () => {
          dispatch(storeSelectedDashboardTab('Users'));
          setSelectedDashboardTab('Users');
        },
      });
      setDrawerItems(adminDrawer);
    }
  }, []);

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton>
          {open ? (
            <Logo useFor="dashboard" />
          ) : (
            <img src={logo} style={{ marginLeft: 'auto', width: '60%' }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List className={styles.drawerItemsList}>
        {drawerItems.map((item: any) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: 'block' }}
            onClick={item.action}
            className={
              selectedDashboardTab === item.text
                ? styles.selectedDrawerItem
                : styles.drawerItem
            }
          >
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
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
                className={`${styles.drawerItemText} dashboard-drawer-item-text`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
