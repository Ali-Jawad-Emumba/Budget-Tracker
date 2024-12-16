import { useForm } from 'react-hook-form';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
} from '@mui/material';
import { InputBootstrapStyled } from '../utils/styled-components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ExpenseModal = ({
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
  const userId = localStorage.getItem('UserId');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: expenseBeingEdit });
  const getExpenseBody = (data: any) =>
    JSON.stringify({
      title: data.title,
      price: data.price,
      date: data.date || new Date().toLocaleDateString(),
    });
  const headers = {
    'Content-Type': 'application/json',
  };
  const editExpense = async (data: any) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:3000/expenses/${expenseBeingEdit._id}`,
      {
        method: 'PATCH',
        headers,
        body: getExpenseBody(data),
      }
    );
    if (response.ok) {
      setIsLoading(false);
      setIsOpen(false);
      reloadData();
    }
  };
  const addExpense = async (data: any) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:3000/users/${userId}/expenses`,
      {
        method: 'POST',
        headers,
        body: getExpenseBody(data),
      }
    );
    if (response.ok) {
      setIsLoading(false);
      setIsOpen(false);
      reloadData();
    }
  };
  useEffect(() => {
    if (useFor === 'Add') {
      reset(expenseBeingEdit); // Reset form to defaultValue when it changes
    }
    setIsLoading(false);
  }, [isOpen]);
  useEffect(() => {
    if (expenseBeingEdit) {
      reset(expenseBeingEdit); // Reset form to defaultValue when it changes
    }
  }, [expenseBeingEdit, reset]);

  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <DialogTitle>{useFor} Expense</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <form
          onSubmit={handleSubmit(useFor === 'Add' ? addExpense : editExpense)}
        >
          <FormControl fullWidth>
            <label>Title</label>
            <InputBootstrapStyled
              {...register('title', { required: true })}
              fullWidth
              sx={{ height: '40px' }}
            />
          </FormControl>
          <div style={{ display: 'flex', gap: '10px' }}>
            <FormControl>
              <label>Price</label>
              <InputBootstrapStyled
                {...register('price', { required: true })}
                sx={{ height: '40px' }}
              />
            </FormControl>
            <FormControl>
              <label>Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="datePicker"
                  defaultValue={dayjs(expenseBeingEdit?.date)}
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
  );
};

export default ExpenseModal;
