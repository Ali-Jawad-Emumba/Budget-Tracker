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
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AnalysisDashboardContent = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] =
    useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<string>();
  const [originalExpensesData, setOriginalExpensesData] = useState<any>();
  const [filteredExpensesData, setFilteredExpensesData] = useState<any>();
  const [expenseBeingEdit, setExpenseBeingEdit] = useState<any>();
  const [sortFilterValue, setSortFilterValue] = useState<string>('12 months');
  const [dateFilter, setDateFilter] = useState<any>();
  const [search, setSearch] = useState<string>();
  const [expenseMetaData, setExpenseMetaData] = useState<any>();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const userId = localStorage.getItem('UserId');
  const isAdmin = useSelector((state: any) => state.isAdmin);
  const headers = useSelector((state: any) => state.callHeaders);
  const [newData, setNewData] = useState<any>();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // const data = [
  //   { name: 'Jan', value: 70 }
  //   { name: 'Feb', value: 80 },
  //   { name: 'Mar', value: 65 },
  //   { name: 'Apr', value: 40 },
  //   { name: 'May', value: 90 },
  //   { name: 'Jun', value: 20 },
  //   { name: 'Jul', value: 30 },
  //   { name: 'Aug', value: 50 },
  //   { name: 'Sep', value: 70 },
  //   { name: 'Oct', value: 85 },
  //   { name: 'Nov', value: 100 },
  //   { name: 'Dec', value: 20 },
  // ];
  const filterMonths = (expenseData: any, lastMonths: number) => {
    const today = new Date(); // Current date
    const sixMonthsAgo = new Date(today); // Copy the current date
    sixMonthsAgo.setMonth(today.getMonth() - lastMonths); // Subtract 6 months
    const month = sixMonthsAgo.getMonth() + 1;
    const year = sixMonthsAgo.getFullYear();
    if (month + lastMonths > months.length) {
      const monthsOfNewYear = month + lastMonths - months.length;
      const monthsOfLastYear = months.length - month;
      const dataOfLastYear = expenseData
        .filter((expense: any) => new Date(expense.date).getFullYear() === year)
        .filter(
          (expense: any) =>
            new Date(expense.date).getMonth() + 1 >= monthsOfLastYear
        )
        .sort((a: any, b: any) =>
          new Date(a.date).getMonth() + 1 > new Date(b.date).getMonth() + 1
            ? 1
            : -1
        );

      const dataOfNewYear = expenseData
        .filter(
          (expense: any) => new Date(expense.date).getFullYear() === year + 1
        )
        .filter(
          (expense: any) =>
            new Date(expense.date).getMonth() + 1 <= monthsOfNewYear
        )
        .sort((a: any, b: any) =>
          lastMonths === 1
            ? new Date(a.date).getDate() > new Date(b.date).getDate()
              ? 1
              : -1
            : new Date(a.date).getMonth() + 1 > new Date(b.date).getMonth() + 1
            ? 1
            : -1
        );

      return [...dataOfLastYear, ...dataOfNewYear];
    } else {
      return expenseData
        .filter((expense: any) => new Date(expense.date).getFullYear() === year)
        .filter(
          (expense: any) => new Date(expense.date).getMonth() + 1 >= month
        )
        .sort((a: any, b: any) =>
          lastMonths === 1
            ? new Date(a.date).getDate() > new Date(b.date).getDate()
              ? 1
              : -1
            : new Date(a.date).getMonth() + 1 > new Date(b.date).getMonth() + 1
            ? 1
            : -1
        );
    }
  };

  const getNewResult = (result: any) => {
    return result.map((expense: any) => ({
      name: months[new Date(expense.date).getMonth()],
      value: result
        .filter(
          (item: any) =>
            new Date(item.date).getMonth() + 1 ===
              new Date(expense.date).getMonth() + 1 &&
            new Date(item.date).getFullYear() ===
              new Date(expense.date).getFullYear()
        )
        .reduce((sum: number, element: any) => (sum += element.price), 0),
    }));
  };
  const filterData = (sortValue: string, data?: any) => {
    const expenseData = [...(originalExpensesData || data)];
    // Apply sort filter
    let result: any[];
    switch (sortValue) {
      case '12 months':
        {
          result = filterMonths(expenseData, 12);
          const newResult = getNewResult(result);
          const uniqueResults = [
            ...new Set(newResult.map((e: any) => JSON.stringify(e))),
          ].map((e: any) => JSON.parse(e));
          console.log(uniqueResults);
          setNewData(uniqueResults);
        }
        break;
      case '6 months':
        {
          result = filterMonths(expenseData, 6);
          const newResult = getNewResult(result);
          const uniqueResults = [
            ...new Set(newResult.map((e: any) => JSON.stringify(e))),
          ].map((e: any) => JSON.parse(e));
          console.log(uniqueResults);
          setNewData(uniqueResults);
        }
        break;
      case '1 month':
        {
          result = filterMonths(expenseData, 1);
          const newResult = result.map((expense: any) => ({
            name: new Date(expense.date).getDate(),
            value: result
              .filter(
                (item: any) =>
                  new Date(item.date).getDate() ===
                    new Date(expense.date).getDate() &&
                  new Date(item.date).getMonth() + 1 ===
                    new Date(expense.date).getMonth() + 1
              )
              .reduce((sum: number, element: any) => (sum += element.price), 0),
          }));

          const uniqueResults = [
            ...new Set(newResult.map((e: any) => JSON.stringify(e))),
          ].map((e: any) => JSON.parse(e));
          setNewData(uniqueResults);
        }
        break;
    }
  };
  const getExpenses = async () => {
    const fetchFn = await fetch(
      `http://localhost:3000/users/${userId}/all-expenses`,
      {
        method: 'GET',
        headers,
      }
    );
    const response = await fetchFn.json();
    const data = response;
    setOriginalExpensesData(data);
    setFilteredExpensesData(data);
    filterData('12 months', data);
  };

  useEffect(() => {
    (async () => {
      await getExpenses();
    })();
  }, []);

  const deleteExpense = async (expenseId: number) => {
    const response = await fetch(
      `http://localHost:3000/expenses/${expenseId}`,
      {
        method: 'DELETE',
        headers,
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
          <h1 className="poppins-semibold">Analysis</h1>
        </div>
        <div
          className={styles.dataTable}
          style={{ backgroundColor: 'white', borderRadius: '0 0 5px 5px' }}
        >
          <div className={styles.tableHeader}>
            <h1 className="poppins-semibold">Expenses</h1>
            <div className={styles.filters}>
              <div className={styles.filterDiv}>
                <div className={styles.filter}>
                  <p className={`${styles.filterLabel} poppins-regular`}>
                    Range
                  </p>
                </div>

                <Select
                  fullWidth
                  value={sortFilterValue}
                  sx={{ height: '40px', width: '150px' }}
                  onChange={(e) => {
                    setSortFilterValue(e.target.value);
                    filterData(e.target.value);
                  }}
                >
                  <MenuItem value="12 months">Last 12 Months</MenuItem>
                  <MenuItem value="6 months">Last 6 months</MenuItem>
                  <MenuItem value="1 month">Last Month</MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <ResponsiveContainer aspect={3.25}>
            <LineChart
              data={newData}
              margin={{ top: 20, right: 50, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip/>
              <Legend align="right" verticalAlign="top" />
              <Line
                type="monotone" //helps in curve
                dataKey="value"
                stroke="#7539FF"
                dot={{ fill: '#7539FF' }}
              />
            </LineChart>
          </ResponsiveContainer>
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

export default AnalysisDashboardContent;
