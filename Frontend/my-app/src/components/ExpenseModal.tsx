import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
} from '@mui/material';
import { InputBootstrapStyled } from '../utils/styled-components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ExpenseModal = ({
  isOpen,
  setIsOpen,
  useFor,
}: {
  isOpen: boolean;
  setIsOpen: any;
  useFor: string;
}) => {
  const userId = localStorage.getItem('UserId');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const response = await fetch(`http://localhost:3000/expenses/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        date: data.date || new Date().toLocaleDateString(),
      }),
    });
    if (response.ok) setIsOpen(false);
  };
  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <DialogTitle>{useFor} Expense</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  defaultValue={dayjs('2022-04-17')}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {useFor === 'Add' ? useFor : 'Update'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
