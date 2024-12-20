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


const UsersDashboardContent = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] =
    useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<string>();
  const [originalUsersData, setOriginalUsersData] = useState<any>();
  const [filteredUsersData, setFilteredUsersData] = useState<any>();
  const [expenseBeingEdit, setExpenseBeingEdit] = useState<any>();
  const [sortFilterValue, setSortFilterValue] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<any>();
  const [search, setSearch] = useState<string>();
  const [expenseMetaData, setExpenseMetaData] = useState<any>();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const userId = localStorage.getItem('UserId');
  const isAdmin=useSelector((state:any)=>state.isAdmin)
const headers=useSelector((state:any)=>state.callHeaders)

  const filterData = ({
    sortValue,
    search,
  }: {
    sortValue?: string;
    search?: string;
  }) => {
    let result = [...originalUsersData];
    // Apply sort filter
    if (sortValue) {
      switch (sortValue) {
        case 'name':
          result = result.sort((a: any, b: any) =>
            a.firstname === b.firstname ? 0 : a.firstname < b.firstname ? -1 : 1
          );
          break;
        case 'email':
          result = result.sort((a: any, b: any) =>
            a.email === b.email ? 0 : a.email < b.email ? -1 : 1
          );
          break;
        case 'role':
          result = [...result.filter(user=>user._id===import.meta.env.VITE_ADMIN_ID), ...result.filter(user=>user._id!==import.meta.env.VITE_ADMIN_ID)]
          break;
      }
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((user: any) =>
        [user.firstname, user.lastname, user.email].some(field=>field.toLowerCase().includes(searchLower))
      );
    }

    setFilteredUsersData(result);
  };
  const getUsers = async () => {
    const fetchFn=await fetch("http://localHost:3000/users", {
      method:"GET",
      headers
    })
    const response = await fetchFn.json();
    setExpenseMetaData(response);
    const data = response.data;
    setOriginalUsersData(data);
    setFilteredUsersData(data);
  };

  useEffect(() => {
    (async () => await getUsers())();
  }, []);

  const deleteUser = async (userId: number) => {
    const response = await fetch(
      `http://localHost:3000/users/${userId}`,
      {
        method: 'DELETE',
        headers
      }
    );
    if (response.ok) {
      await getUsers();
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
          <h1 className="poppins-semibold">Users</h1>
          <DashboardButton
            onClick={() => setIsAddExpenseModalOpen(true)}
            sx={{ margin: 'auto 0' }}
          >
            Add User
          </DashboardButton>
        </div>
        <div className={styles.dataTable}>
          <div className={styles.tableHeader}>
            <h1 className="poppins-semibold">Users</h1>
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
                      search: search,
                    });
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="role">Role</MenuItem>

                </Select>
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
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsersData?.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.firstname}
                    </TableCell>
                    <TableCell>
                      {row.lastname}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row._id === import.meta.env.VITE_ADMIN_ID?"Admin":"User"}</TableCell>
                    <TableCell>
                      {
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <div onClick={() => deleteUser(row._id)}>
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
                Showing {filteredUsersData?.length}/
                {expenseMetaData?.totalRecords}
              </caption>
              <Pagination
                count={expenseMetaData?.totalPages}
                variant="outlined"
                shape="rounded"
                onChange={(_, page) => {
                  setSelectedPage(page);
                  getUsers();
                }}
              />
            </div>
          </TableContainer>
        </div>
      </div>
      <ExpenseModal
        role="Admin"
        useFor="Add"
        isOpen={isAddExpenseModalOpen}
        setIsOpen={setIsAddExpenseModalOpen}
        reloadData={getUsers}
      />
      <ExpenseModal
        role="Admin"
        useFor="Edit"
        isOpen={isEditExpenseModalOpen}
        setIsOpen={setIsEditExpenseModalOpen}
        expenseBeingEdit={expenseBeingEdit}
        reloadData={getUsers}
      />
    </>
  );
};

export default UsersDashboardContent;
