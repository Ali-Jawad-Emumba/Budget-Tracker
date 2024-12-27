import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { StyledButton, CancelButton } from '../../utils/styled-components';

import { useState } from 'react';
import styles from './Modal.module.css';
import Notifictaion from '../notification/Notification';

import { useDispatch } from 'react-redux';

import { ModalProps } from '../../utils/types';
import { updateNotifications } from '../../app/store';
import { deleteExpenseById, deleteUserById } from '../../utils/api-calls';
import { CloseButton } from '../../utils/shared';

const DeleteModal = ({
  isOpen,
  setIsOpen,
  useFor,
  reloadData,
  item,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getUserFields = () => [
    { title: 'First Name', value: item?.firstname },
    { title: 'Last Name', value: item?.lastname },
    { title: 'Email', value: item?.email },
    { title: 'Phone Number', value: item?.phone },
    { title: 'Budget Limit', value: item?.budgetlimit },
  ];
  const getExpenseFields = () => [
    { title: 'Title', value: item?.title },
    { title: 'Price', value: item?.price },
    {
      title: 'Date',
      value: item?.date ? new Date(item?.date).toLocaleDateString() : null,
    },
  ];
  const fields = useFor === 'Expense' ? getExpenseFields() : getUserFields();
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: '',
    title: '',
    description: '',
  });
  const deleteData = async () => {
    setIsLoading(true);
    const response =
      useFor === 'Expense'
        ? await deleteExpenseById(item._id)
        : await deleteUserById(item._id);
    if (response.ok) {
      setIsLoading(false);
      const deleted = await response.json();
      setSnackBar({
        open: true,
        useFor: 'delete',
        title: `${useFor} Deleted`,
        description: `${useFor} deleted successfully`,
      });
      setIsOpen(false);
      setTimeout(() => setSnackBar(null), 5000);
      dispatch(
        updateNotifications({
          name: deleted.title,
          action: 'delete',
          time: `${new Date()}`,
        })
      );

      await reloadData();
    }
  };

  return (
    <>
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <div className={styles.modal} style={{ width: '400px' }}>
          <DialogTitle>
            Delete {useFor}
            <CloseButton setIsOpen={setIsOpen} />
          </DialogTitle>
          <DialogContent>
            <div
              className={`${styles.deleteModalContent} ${
                useFor === 'Expense' ? styles.deleteExpense : styles.deleteUser
              }`}
            >
              {fields.map((field, index) => (
                <div key={index}>
                  <label>{field.title}</label>
                  <p>{field.value}</p>
                </div>
              ))}
            </div>
            <div className={styles.rowFlex}>
              <CancelButton
                sx={{ width: '45%', padding: '10px 0' }}
                variant="outlined"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </CancelButton>
              <StyledButton
                sx={{
                  width: '50%',
                  borderRadius: '8px',
                  padding: '10px 0',
                  backgroundColor: '#EF4435',
                }}
                variant="contained"
                onClick={() => deleteData()}
              >
                {isLoading ? (
                  <CircularProgress size={'30px'} color="inherit" />
                ) : (
                  'Delete'
                )}
              </StyledButton>
            </div>
          </DialogContent>
        </div>
      </Dialog>
      <Notifictaion {...snackBar} />
    </>
  );
};

export default DeleteModal;
