import {
  Button,
  CSSObject,
  FilledInput,
  Theme,
  Drawer as MuiDrawer,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const InputBootstrapStyled = styled(FilledInput)(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: 4,

  '& .MuiInputBase-input': {
    position: 'relative',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  '& .MuiInputAdornment-root': {
    margin: 0,
  },
  '&::before': {
    content: '"\\00a0"',
    borderBottom: 'none',
  },
  '&::after': {
    borderBottom: 'none',
  },
}));

export const SignupLoginBtn = styled(Button)(() => ({
  backgroundColor: '#7539FF',
  padding: '12px 8px',
  color: 'white',
}));

export const StyledButton = styled(Button)(() => ({
  backgroundColor: '#7539FF',
  width: '150px',
  height: 'fit-content',
  color: 'white',
  textTransform: 'none',
  fontSize: '0.875rem',
}));
export const CancelButton = styled(Button)(() => ({
  backgroundColor: '#FFF',
  width: '150px',
  height: 'fit-content',
  color: '#9E9E9E',
  textTransform: 'none',
  fontSize: '0.875rem',
  border:"1px solid #9E9E9E",
  borderRadius:"8px"
}));

export const openedMixin = (theme: Theme): CSSObject => ({
  width: 240,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }: { open: any }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }: { open: any }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));
