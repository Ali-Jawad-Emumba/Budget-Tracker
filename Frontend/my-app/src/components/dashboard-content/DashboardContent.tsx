import {
  DashboardButton,
  InputBootstrapStyled,
} from '../../utils/styled-components';
import styles from './DashboardContent.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect, useState } from 'react';
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import { DeleteIcon, EditIcon } from '../../pages/dashboard/DashboardIcons';
import ExpenseModal from '../ExpenseModal';

const DashboardContent = ({ dataFor }: { dataFor: string }) => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] =
    useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<string>();
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
      `http://localhost:3000/users/${userId}/expenses?page=${selectedPage}`
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
      }
    );
    if (response.ok) {
      await getExpenses();
    }
  };

  const budgetLimit: any = localStorage.getItem('Budget');
  const ProgressBar = ({ price }: { price: number }) => {
    const value = price > budgetLimit ? 100 : (price / budgetLimit) * 100;

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
      <div className={styles.dashboardContent}>
        <div className={styles.dataTableHeader}>
          <h1 className="poppins-semibold">{dataFor}</h1>
          <DashboardButton
            onClick={() => setIsAddExpenseModalOpen(true)}
            sx={{ margin: 'auto 0' }}
          >
            Add {dataFor}
          </DashboardButton>
        </div>
        <div className={styles.dataTable}>
          <div className={styles.tableHeader}>
            <h1 className="poppins-semibold">{dataFor}</h1>
            <div className={styles.filters}>
              <div className={styles.filterDiv}>
                <div className={styles.filter}>
                  <p className={`${styles.filterLabel} poppins-regular`}>
                    Sort By
                  </p>
                </div>

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
                  <MenuItem value="low to high">Price: Low to High</MenuItem>
                  <MenuItem value="high to low">Price: High to Low</MenuItem>
                </Select>
              </div>
              <div>
                <div className={styles.filterDiv}>
                  <div className={styles.filter}>
                    <p className={`${styles.filterLabel} poppins-regular`}>
                      By Date
                    </p>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="datePicker"
                      sx={{ height: '40px' }}
                      onChange={(e) => {
                        setDateFilter(e);
                        filterData({
                          sortValue: sortFilterValue,
                          dateValue: e,
                          search: search,
                        });
                      }}
                      defaultValue={dayjs(new Date())}
                    />
                  </LocalizationProvider>
                </div>
              </div>
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
            </div>
          </div>
          <TableContainer
            sx={{ borderRadius: '0 0 7px 7px' }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>Expense</TableCell>
                  <TableCell>Total Expenditure</TableCell>
                  <TableCell>Price(PKR)</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExpensesData?.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell>
                      <ProgressBar price={row.price} />
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      {
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <div onClick={() => deleteExpense(row._id)}>
                            <DeleteIcon />
                          </div>
                          <div
                            onClick={() => {
                              setExpenseBeingEdit(row),
                                setIsEditExpenseModalOpen(true);
                            }}
                          >
                            <EditIcon />
                          </div>
                        </div>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className={styles.paginationDiv}>
              <caption className="poppins-regular">
                Showing {filteredExpensesData?.length}/
                {expenseMetaData?.totalRecords}
              </caption>
              <Pagination
                count={expenseMetaData?.totalPages}
                variant="outlined"
                shape="rounded"
                onChange={(_, page) => {
                  setSelectedPage(page);
                  getExpenses();
                }}
              />
            </div>
          </TableContainer>
        </div>
      </div>
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
    </>
  );
};

export default DashboardContent;
