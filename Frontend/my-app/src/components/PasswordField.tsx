import { IconButton, InputAdornment } from '@mui/material';
import { InputBootstrapStyled } from '../utils/styled-components';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Visibility } from '@mui/icons-material';
import { useState } from 'react';

const PasswordField = ({
  formRegister,
  checkAndThrowError,
}: {
  formRegister: any;
  checkAndThrowError: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <InputBootstrapStyled
        fullWidth
        {...formRegister}
        placeholder="Enter your password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? 'hide the password' : 'display the password'
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {checkAndThrowError && checkAndThrowError()}
    </>
  );
};

export default PasswordField;
