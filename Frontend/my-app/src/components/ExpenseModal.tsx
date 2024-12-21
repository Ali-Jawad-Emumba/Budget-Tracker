import { useForm } from 'react-hook-form';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Snackbar,
} from '@mui/material';
import { InputBootstrapStyled } from '../utils/styled-components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm';

import Notifictaion from './notification/Notification';
import { Description } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateNotifications } from '../app/store';
import {
  getCharactersMessage,
  requiredMessage,
} from '../utils/shared';
import { patchExpense, postExpense } from '../utils/api-calls';
import { ModalProps } from '../utils/types';


const ExpenseModal = ({
  isOpen,
  setIsOpen,
  useFor,
  beingEdit,
  reloadData,
}:ModalProps ) => {
  const userId = localStorage.getItem('UserId');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: beingEdit });
  const getExpenseBody = (data: any) =>
    JSON.stringify({
      title: data.title,
      price: data.price,
      date: expenseDate || new Date(),
    });
  const [expenseDate, setExpenseDate] = useState<any>();
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: '',
    title: '',
    description: '',
  });
  const maxLengthValidation = { value: 30, message: getCharactersMessage(30) };
  const editExpense = async (data: any) => {
    setIsLoading(true);
    const response = await patchExpense({
      id: beingEdit._id,
      data: getExpenseBody(data),
    });
    if (response.ok) {
      setIsLoading(false);
      setIsOpen(false);
      setSnackBar({
        open: true,
        useFor: 'edit',
        title: 'Expense Updated',
        description: 'Expense edited successfully',
      });

      setTimeout(() => setSnackBar(null), 5000);
      dispatch(
        updateNotifications({
          name: data.title,
          action: 'edit',
          time: `${new Date()}`,
        })
      );
      reloadData();
    }
  };

  const addExpense = async (data: any) => {
    setIsLoading(true);
    const response = await postExpense({
      id: userId,
      data: getExpenseBody(data),
    });
    if (response.ok) {
      setIsLoading(false);
      setIsOpen(false);
      setSnackBar({
        open: true,
        useFor: 'add',
        title: 'Expense Added',
        description: 'Expense added successfully',
      });

      setTimeout(() => setSnackBar(null), 5000);
      dispatch(
        updateNotifications({
          name: data.title,
          action: 'add',
          time: `${new Date()}`,
        })
      );
      reloadData();
    }
  };
  useEffect(() => {
    useFor === 'Add'
      ? reset(beingEdit)
      : setExpenseDate(
          dayjs(useFor === 'Edit' ? beingEdit?.date : new Date())
        );
    setIsLoading(false);
  }, [isOpen]);
  useEffect(() => {
    if (beingEdit) {
      reset(beingEdit); // Reset form to defaultValue when it changes
    }
  }, [beingEdit, reset]);

  return (
    <>
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <DialogTitle>Expense</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <form
            onSubmit={handleSubmit(useFor === 'Add' ? addExpense : editExpense)}
          >
            <FormControl fullWidth>
              <label>Title</label>
              <InputBootstrapStyled
                {...register('title', {
                  required: requiredMessage,
                  maxLength: maxLengthValidation,
                })}
                fullWidth
                sx={{ height: '40px' }}
              />
            </FormControl>
            <div style={{ display: 'flex', gap: '10px' }}>
              <FormControl>
                <label>Price</label>
                <InputBootstrapStyled
                  {...register('price', {
                    required: requiredMessage,
                    maxLength: maxLengthValidation,
                  })}
                  sx={{ height: '40px' }}
                  type="number"
                />
              </FormControl>
              <FormControl>
                <label>Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="datePicker"
                    disableFuture={true}
                    value={dayjs(expenseDate)}
                    onChange={(event: any) =>
                      setExpenseDate(event.$d.toLocaleDateString())
                    }
                  />
                </LocalizationProvider>
              </FormControl>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {isLoading ? (
                  <CircularProgress size={'30px'} color="inherit" />
                ) : useFor === 'Add' ? (
                  useFor
                ) : (
                  'Update'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Notifictaion {...snackBar} />
    </>
  );
};

export default ExpenseModal;
