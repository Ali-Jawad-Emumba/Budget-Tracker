import { DashboardButton } from '../../utils/styled-components';
import styles from './DashboardContent.module.css';

import {
  Box,
  Button,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ExpenseModal from '../ExpenseModal';
import { useDispatch, useSelector } from 'react-redux';
import DashboardContentLayout from './DashboardContentLayout';
import Filter from './Filter';
import DataTable from './DataTable';
import { storeExpenseAllData } from '../../app/store';

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
  const userId = localStorage.getItem('UserId');

  const filterData = ({
    sortValue,
    dateValue,
    search,
  }: {
    sortValue?: string;
    dateValue?: any | null;
    search?: string;
  }) => {
    let result = [...originalExpensesData];
    // Apply sort filter
    if (sortValue) {
      switch (sortValue) {
        case 'low to high':
          result = result.sort((a: any, b: any) =>
            a.price === b.price ? 0 : a.price < b.price ? -1 : 1
          );
          break;
        case 'high to low':
          result = result.sort((a: any, b: any) =>
            a.price === b.price ? 0 : a.price < b.price ? 1 : -1
          );
          break;
        case 'old to new':
          result = result.sort((a: any, b: any) =>
            a.date === b.date ? 0 : new Date(a.date) > new Date(b.date) ? 1 : -1
          );
          break;
        case 'new to old':
          result = result.sort((a: any, b: any) =>
            a.date === b.date ? 0 : new Date(a.date) > new Date(b.date) ? -1 : 1
          );
          break;
      }
    }

    // Apply date filter
    if (dateValue) {
      result = result.filter(
        (expense: any) =>
          new Date(expense.date).toLocaleDateString() ===
          new Date(dateValue).toLocaleDateString()
      );
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((expense: any) =>
        expense.title.toLowerCase().includes(searchLower)
      );
    }

    setFilteredExpensesData(result);
  };
  const getExpenses = async () => {
    const fetchFn = await fetch(
      `http://localhost:3000/users/${userId}/expenses?page=${selectedPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const response = await fetchFn.json();
    setExpenseMetaData(response);

    const data = response.data;
    setOriginalExpensesData(data);
    setFilteredExpensesData(data);
  };

  useEffect(() => {
    (async () => await getExpenses())();
  }, []);
  

  const deleteExpense = async (expenseId: number) => {
    const response = await fetch(
      `http://localHost:3000/expenses/${expenseId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if (response.ok) {
      await getExpenses();
    }
  };

  const budgetLimit: any = localStorage.getItem('Budget');
  const ProgressBar = ({ expense }: { expense: any }) => {
    const totalExpenseOfMonth = filteredExpensesData
      .filter(
        (item: any) =>
          new Date(item.date).getMonth() + 1 ===
            new Date(expense.date).getMonth() + 1 &&
          new Date(item.date).getFullYear() ===
            new Date(expense.date).getFullYear()
      )
      .reduce((sum: number, element: any) => (sum += element.price), 0);
    const value = (expense.price / totalExpenseOfMonth) * 100;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={value} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >{`${Math.round(value)}%`}</Typography>
        </Box>
      </Box>
    );
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
          expenseBeingEdit={expenseBeingEdit}
          reloadData={getExpenses}
        />
      </DashboardContentLayout>
    </>
  );
};

export default ExpenseDashboardContent;
