import { useForm } from 'react-hook-form';
import {

  Dialog,
  DialogContent,
  DialogTitle,

} from '@mui/material';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm';


const UserModal = ({
  isOpen,
  setIsOpen,
  useFor,
  expenseBeingEdit,
  reloadData,
}: {
  isOpen: boolean;
  setIsOpen: any;
  useFor: string;
  expenseBeingEdit?: any;
  reloadData?: any;
}) => {
  
  


 
  
//   useEffect(() => {
//     if (useFor === 'Add') {
//       reset(expenseBeingEdit); // Reset form to defaultValue when it changes
//     }
//     setIsLoading(false);
//   }, [isOpen]);
//   useEffect(() => {
//     if (expenseBeingEdit) {
//       reset(expenseBeingEdit); // Reset form to defaultValue when it changes
//     }
//   }, [expenseBeingEdit, reset]);


  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <DialogTitle>
        User
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        
          <SignUpForm
            useFor={`${useFor.toLowerCase()} modal`}
            defaultValues={expenseBeingEdit}
            setModalOpen={setIsOpen}
            reloadData={reloadData}
          />
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
