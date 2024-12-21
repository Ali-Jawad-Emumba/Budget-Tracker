import { MenuItem, Select } from '@mui/material';

import { useEffect, useState } from 'react';

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
import { getAllExpenses } from '../../utils/api-calls';
import { filterData } from './DashboardContent.service';
import { ChartData, InitialState } from '../../utils/types';
import { useSelector } from 'react-redux';

const AnalysisDashboardContent = () => {
  const [originalExpensesData, setOriginalExpensesData] = useState<any>();
  const [sortFilterValue, setSortFilterValue] = useState<string>('12 months');
  const [chartData, setChartData] = useState<ChartData[]>();
  const userId = useSelector((state: InitialState) => state.userId);
  const getExpenses = async () => {
    const data = await getAllExpenses(userId);
    setOriginalExpensesData(data);
    filterData(data, '12 months', setChartData);
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
              filterData(originalExpensesData, e.target.value, setChartData);
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
