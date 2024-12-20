import styles from './DashboardContent.module.css';

import {
  Box,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';

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
import DashboardContentLayout from './DashboardContentLayout';
import Filter from './Filter';

const AnalysisDashboardContent = () => {
  const [originalExpensesData, setOriginalExpensesData] = useState<any>();
  const [filteredExpensesData, setFilteredExpensesData] = useState<any>();
  const [sortFilterValue, setSortFilterValue] = useState<string>('12 months');
  const userId = localStorage.getItem('UserId');
  const [chartData, setChartData] = useState<any>();

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

  const removeDuplication = (data: any) =>
    [...new Set(data.map((e: any) => JSON.stringify(e)))].map((e: any) =>
      JSON.parse(e)
    );

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

      const result = [...dataOfLastYear, ...dataOfNewYear];
      const uniqueResults = removeDuplication(result);
      return uniqueResults;
    } else {
      const result = expenseData
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
      const uniqueResults = removeDuplication(result);
      return uniqueResults;
    }
  };

  const formatDataForChart = (result: any) => {
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
    let monthsFiltered: any[];
    switch (sortValue) {
      case '12 months':
        {
          monthsFiltered = filterMonths(expenseData, 12);
          const data = formatDataForChart(monthsFiltered);
          setChartData(data);
        }
        break;
      case '6 months':
        {
          monthsFiltered = filterMonths(expenseData, 6);
          const data = formatDataForChart(monthsFiltered);
          setChartData(data);
        }
        break;
      case '1 month':
        {
          monthsFiltered = filterMonths(expenseData, 1);
          const results = monthsFiltered.map((expense: any) => ({
            name: new Date(expense.date).getDate(),
            value: monthsFiltered
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
            ...new Set(results.map((e: any) => JSON.stringify(e))),
          ].map((e: any) => JSON.parse(e));
          setChartData(uniqueResults);
        }
        break;
    }
  };
  const getExpenses = async () => {
    const fetchFn = await fetch(
      `http://localhost:3000/users/${userId}/all-expenses`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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


  return (
    <DashboardContentLayout
      title="Analysis"
      tableTitle="Expenses"
      button={''}
      filters={
        <Filter title="Range">
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
        </Filter>
      }
    >
      <ResponsiveContainer aspect={3.25}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 50, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend align="right" verticalAlign="top" />
          <Line
            type="monotone" //helps in curve
            dataKey="value"
            stroke="#7539FF"
            dot={{ fill: '#7539FF' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardContentLayout>
  );
};

export default AnalysisDashboardContent;
