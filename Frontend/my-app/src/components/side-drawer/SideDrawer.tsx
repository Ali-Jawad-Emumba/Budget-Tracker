import { styled, Theme, CSSObject } from '@mui/material/styles';
import styles from './SlideDrawer.module.css';
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

import Logo from '../Logo/Logo';
import logo from '../../assets/images/logo.png';
import { AnalysisIcon, ExpensesIcon, LogoutIcon } from './DrawerIcons';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerHeader } from '../../utils/styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { storeUserData } from '../../app/store';

export default function SideDrawer({ open }: { open: boolean }) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const selectedDashboardTab=useSelector((state:any)=>state.selectedDashboardTab)
  const [selectedDashboardTab, setSelectedDashbpardTab] =
    useState<string>('Expenses');
  const dispatch = useDispatch();
  const drawerItems = [
    {
      text: 'Analysis',
      icon: <AnalysisIcon />,
      action: () => setSelectedDashbpardTab('Analysis'),
    },
    {
      text: 'Expenses',
      icon: <ExpensesIcon />,
      action: () => setSelectedDashbpardTab('Expenses'),
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      action: () => {
        localStorage.removeItem('UserId');
        dispatch(storeUserData(null));
        navigate('/');
      },
    },
  ];

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
        {drawerItems.map((item) => (
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
                className={styles.drawerItemText}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
