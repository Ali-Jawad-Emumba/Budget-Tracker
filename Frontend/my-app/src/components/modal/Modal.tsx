import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';

const Modal = ({
  open,
  setOpen,
  title,
  children,
}: {
  open: boolean;
  setOpen: any;
  title: string;
  children?: any;
}) => {
  return (
    <div>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{display:"flex", flexDirection:"column", gap:"10px"}}>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
