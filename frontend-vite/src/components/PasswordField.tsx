import { IconButton, InputAdornment } from '@mui/material';
import { InputBootstrapStyled } from '../utils/styled-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { PasswordFieldProps } from '../utils/types';

const PasswordField = ({
  formRegister,
  checkAndThrowError,
  changeHandler,
}: PasswordFieldProps) => {
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
        onChange={changeHandler}
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
