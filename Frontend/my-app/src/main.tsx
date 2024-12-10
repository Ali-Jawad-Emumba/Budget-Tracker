import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store } from './app/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your MUI theme file
import { App } from './app/App';
import './styles.css';
import { store } from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);
