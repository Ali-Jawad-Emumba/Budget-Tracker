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
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';
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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];
const DashboardContent = ({ dataFor }: { dataFor: string }) => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] =
    useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<string>();

  const actionButtons = (
    <div style={{ display: 'flex', gap: '10px' }}>
      <DeleteIcon />
      <div onClick={() => setIsEditExpenseModalOpen(true)}>
        <EditIcon />
      </div>
    </div>
  );
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
                  value="All"
                  sx={{ height: '40px', width: '150px' }}
                  onChange={() => {}}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
                      defaultValue={dayjs('2022-04-17')}
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
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell>{row.fat}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{actionButtons}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className={styles.paginationDiv}>
              <caption className="poppins-regular">Showing 3/25</caption>
              <Pagination count={10} variant="outlined" shape="rounded" />
            </div>
          </TableContainer>
        </div>
      </div>
      <ExpenseModal
        useFor="Add"
        isOpen={isAddExpenseModalOpen}
        setIsOpen={setIsAddExpenseModalOpen}
      />
      <ExpenseModal
        useFor="Edit"
        isOpen={isEditExpenseModalOpen}
        setIsOpen={setIsEditExpenseModalOpen}
      />
    </>
  );
};

export default DashboardContent;
