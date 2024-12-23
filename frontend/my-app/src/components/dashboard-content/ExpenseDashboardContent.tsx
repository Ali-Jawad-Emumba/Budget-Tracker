import { StyledButton } from '../../utils/styled-components';
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

import ExpenseModal from '../modal/ExpenseModal';
import { useDispatch, useSelector } from 'react-redux';
import DashboardContentLayout from './DashboardContentLayout';
import Filter from './Filter';
import DataTable from './DataTable';
import Notifictaion from '../notification/Notification';
import {
  deleteExpenseById,
  getAllExpensesForAdminTable,
  getExpensesData,
  getYearTotalExpenses,
} from '../../utils/api-calls';
import { InitialState } from '../../utils/types';
import { fetchDashboardData } from '../../utils/shared';

const ExpenseDashboardContent = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] =
    useState<boolean>(false);
  const [originalExpensesData, setOriginalExpensesData] = useState<any[]>();
  const [filteredExpensesData, setFilteredExpensesData] = useState<any[]>();
  const [expenseBeingEdit, setExpenseBeingEdit] = useState<any>();
  const [sortFilterValue, setSortFilterValue] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<any>();
  const [search, setSearch] = useState<string>('');
  const [expenseMetaData, setExpenseMetaData] = useState<any>();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const isAdmin = useSelector((state: InitialState) => state.isAdmin);
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>();
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: '',
    title: '',
    description: '',
  });

  const [tokenCheckInterval, setTokenCheckInterval] = useState<any>();

  const userId = useSelector((state: InitialState) => state.userId);
  const getExpenses = async (filters?: {
    sort: string;
    date: string;
    search: string;
  }) => {
    const response = isAdmin
      ? await getAllExpensesForAdminTable(
          selectedPage,
          filters?.sort,
          filters?.date,
          filters?.search
        )
      : await getExpensesData(
          userId,
          selectedPage,
          filters?.sort,
          filters?.date,
          filters?.search
        );
    setExpenseMetaData(response);
    const data = response.data;
    setOriginalExpensesData(data);
    setFilteredExpensesData(data);
  };

  useEffect(() => {
    fetchDashboardData(
      getExpenses,
      originalExpensesData,
      setToken,
      setTokenCheckInterval
    );
  }, []);
  useEffect(() => {
    const fetchData = async () => await getExpenses();
    fetchData();
    if (tokenCheckInterval) clearInterval(tokenCheckInterval);
  }, [token]);

  return (
    <>
      <DashboardContentLayout
        title="Expense"
        tableTitle="Expense"
        button={
          <StyledButton
            onClick={() => setIsAddExpenseModalOpen(true)}
            sx={{ margin: 'auto 0' }}
          >
            Add Expense
          </StyledButton>
        }
        filters={
          <>
            <Filter title="Sort By">
              <Select
                fullWidth
                value={sortFilterValue}
                sx={{ height: '40px', width: '150px' }}
                onChange={async (e) => {
                  setSortFilterValue(e.target.value);
                  await getExpenses({
                    sort: e.target.value,
                    date: dateFilter,
                    search,
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
                  onChange={async (e) => {
                    setDateFilter(e);
                    await getExpenses({
                      sort: sortFilterValue,
                      date: e,
                      search,
                    });
                  }}
                />
                {dateFilter && (
                  <Button
                    onClick={async () => {
                      setDateFilter(null);
                      setTimeout(
                        async () =>
                          await getExpenses({
                            sort: sortFilterValue,
                            date: '',
                            search,
                          }),
                        500
                      );
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
                onInput={async (e: any) => {
                  setSearch(e.target.value);
                  setTimeout(
                    async () =>
                      await getExpenses({
                        sort: sortFilterValue,
                        date: dateFilter,
                        search: e.target.value,
                      }),
                    500
                  );
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
