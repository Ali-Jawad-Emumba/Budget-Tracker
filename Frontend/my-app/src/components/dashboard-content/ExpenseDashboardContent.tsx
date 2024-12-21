import { DashboardButton } from '../../utils/styled-components';
import styles from './DashboardContent.module.css';

import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ExpenseModal from '../ExpenseModal';
import { useDispatch, useSelector } from 'react-redux';
import DashboardContentLayout from './DashboardContentLayout';
import Filter from './Filter';
import DataTable from './DataTable';
import Notifictaion from '../notification/Notification';
import { updateNotifications } from '../../app/store';
import { deleteExpenseById, getExpensesData } from '../../utils/api-calls';
import { filterExpenseData as filterData } from './DashboardContent.service';
import { InitialState } from '../../utils/types';

const ExpenseDashboardContent = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] =
    useState<boolean>(false);
  const [originalExpensesData, setOriginalExpensesData] = useState<any>();
  const [filteredExpensesData, setFilteredExpensesData] = useState<any>();
  const [expenseBeingEdit, setExpenseBeingEdit] = useState<any>();
  const [sortFilterValue, setSortFilterValue] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<any>();
  const [search, setSearch] = useState<string>();
  const [expenseMetaData, setExpenseMetaData] = useState<any>();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: '',
    title: '',
    description: '',
  });

  const userId = useSelector((state: InitialState) => state.userId);
  const getExpenses = async () => {
    const response = await getExpensesData(userId, selectedPage);
    setExpenseMetaData(response);

    const data = response.data;
    setOriginalExpensesData(data);
    setFilteredExpensesData(data);
  };

  useEffect(() => {
    (async () => await getExpenses())();
  }, []);

  const deleteExpense = async (expenseId: number) => {
    const response = await deleteExpenseById(expenseId);
    if (response.ok) {
      const expenseDeleted = await response.json();
      setSnackBar({
        open: true,
        useFor: 'delete',
        title: 'Expense Deleted',
        description: 'Expense deleted successfully',
      });

      setTimeout(() => setSnackBar(null), 5000);
      dispatch(
        updateNotifications({
          name: expenseDeleted.title,
          action: 'delete',
          time: `${new Date()}`,
        })
      );
      await getExpenses();
    }
  };

  return (
    <>
      <DashboardContentLayout
        title="Expense"
        tableTitle="Expense"
        button={
          <DashboardButton
            onClick={() => setIsAddExpenseModalOpen(true)}
            sx={{ margin: 'auto 0' }}
          >
            Add Expense
          </DashboardButton>
        }
        filters={
          <>
            <Filter title="Sort By">
              <Select
                fullWidth
                value={sortFilterValue}
                sx={{ height: '40px', width: '150px' }}
                onChange={(e) => {
                  setSortFilterValue(e.target.value);
                  filterData({
                    data: originalExpensesData,
                    setData: setFilteredExpensesData,
                    sortValue: e.target.value,
                    dateValue: dateFilter,
                    search: search,
                  });
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="low to high">
                  Price: Lowest to Highest
                </MenuItem>
                <MenuItem value="high to low">
                  Price: Highest to Lowest
                </MenuItem>
                <MenuItem value="old to new">Date: Oldest to Newest</MenuItem>
                <MenuItem value="new to old">Date: Newest to Oldest</MenuItem>
              </Select>
            </Filter>
            <Filter title="By Date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="datePicker"
                  sx={{ height: '40px' }}
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e);
                    filterData({
                      data: originalExpensesData,
                      setData: setFilteredExpensesData,
                      sortValue: sortFilterValue,
                      dateValue: e,
                      search: search,
                    });
                  }}
                />
                {dateFilter && (
                  <Button
                    onClick={() => {
                      setDateFilter(null);
                      filterData({
                        data: originalExpensesData,
                        setData: setFilteredExpensesData,
                        sortValue: sortFilterValue,
                        dateValue: null,
                        search: search,
                      });
                    }}
                  >
                    clear
                  </Button>
                )}
              </LocalizationProvider>
            </Filter>
            <div>
              <TextField
                fullWidth
                id="outlined-start-adornment"
                sx={{ m: 1, width: '300px' }}
                className={styles.searchBox}
                placeholder="Search"
                onInput={(e: any) => {
                  setSearch(e.target.value);
                  filterData({
                    data: originalExpensesData,
                    setData: setFilteredExpensesData,
                    sortValue: sortFilterValue,
                    dateValue: dateFilter,
                    search: e.target.value,
                  });
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
          </>
        }
      >
        <DataTable
          useFor="Expenses"
          data={filteredExpensesData}
          setBeingEdit={setExpenseBeingEdit}
          setIsEditModalOpen={setIsEditExpenseModalOpen}
          setSelectedPage={setSelectedPage}
          metaData={expenseMetaData}
          getData={getExpenses}
          deleteItem={deleteExpense}
        />
        <ExpenseModal
          useFor="Add"
          isOpen={isAddExpenseModalOpen}
          setIsOpen={setIsAddExpenseModalOpen}
          reloadData={getExpenses}
        />
        <ExpenseModal
          useFor="Edit"
          isOpen={isEditExpenseModalOpen}
          setIsOpen={setIsEditExpenseModalOpen}
          beingEdit={expenseBeingEdit}
          reloadData={getExpenses}
        />
      </DashboardContentLayout>
      <Notifictaion {...snackBar} />
    </>
  );
};

export default ExpenseDashboardContent;
