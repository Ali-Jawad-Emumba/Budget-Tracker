import { DashboardButton } from '../../utils/styled-components';
import styles from './DashboardContent.module.css';
import {
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect, useState } from 'react';

import ExpenseModal from '../ExpenseModal';

import DataTable from './DataTable';
import DashboardContentLayout from './DashboardContentLayout';
import Filter from './Filter';
import UserModal from '../UsersModal';
import Notifictaion from '../notification/Notification';
import { useDispatch } from 'react-redux';
import { updateNotifications } from '../../app/store';

const UsersDashboardContent = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
    useState<boolean>(false);

  const [originalUsersData, setOriginalUsersData] = useState<any>();
  const [filteredUsersData, setFilteredUsersData] = useState<any>();
  const [expenseBeingEdit, setUserBeingEdit] = useState<any>();
  const [sortFilterValue, setSortFilterValue] = useState<string>('');

  const [search, setSearch] = useState<string>();
  const [expenseMetaData, setUserMetaData] = useState<any>();
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: '',
    title: '',
    description: '',
  });

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
          result = [
            ...result.filter(
              (user) => user._id === import.meta.env.VITE_ADMIN_ID
            ),
            ...result.filter(
              (user) => user._id !== import.meta.env.VITE_ADMIN_ID
            ),
          ];
          break;
      }
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((user: any) =>
        [user.firstname, user.lastname, user.email].some((field) =>
          field.toLowerCase().includes(searchLower)
        )
      );
    }

    setFilteredUsersData(result);
  };
  const getUsers = async () => {
    const fetchFn = await fetch(
      `http://localHost:3000/users?page=${selectedPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const response = await fetchFn.json();
    setUserMetaData(response);
    const data = response.data;
    setOriginalUsersData(data);
    setFilteredUsersData(data);
  };

  useEffect(() => {
    (async () => await getUsers())();
  }, []);

  const deleteUser = async (userId: number) => {
    const response = await fetch(`http://localHost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      const userDeleted = await response.json();
      setSnackBar({
        open: true,
        useFor: 'delete',
        title: 'User Deleted',
        description: 'User deleted successfully',
      });

      setTimeout(() => setSnackBar(null), 5000);
      dispatch(
        updateNotifications({
          name: userDeleted.title,
          action: 'delete',
          time: `${new Date()}`,
        })
      );
      await getUsers();
    }
  };
  return (
    <>
      <DashboardContentLayout
        title="Users"
        tableTitle="Users"
        button={
          <DashboardButton
            onClick={() => setIsAddUserModalOpen(true)}
            sx={{ margin: 'auto 0' }}
          >
            Add User
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
                    search: search,
                  });
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="role">Role</MenuItem>
              </Select>
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
          useFor="Users"
          data={filteredUsersData}
          setBeingEdit={setUserBeingEdit}
          setIsEditModalOpen={setIsEditUserModalOpen}
          setSelectedPage={setSelectedPage}
          metaData={expenseMetaData}
          getData={getUsers}
          deleteItem={deleteUser}
        />

        <UserModal
          useFor="Add"
          isOpen={isAddUserModalOpen}
          setIsOpen={setIsAddUserModalOpen}
          reloadData={getUsers}
        />
        <UserModal
          useFor="Edit"
          isOpen={isEditUserModalOpen}
          setIsOpen={setIsEditUserModalOpen}
          expenseBeingEdit={expenseBeingEdit}
          reloadData={getUsers}
        />
      </DashboardContentLayout>

      <Notifictaion {...snackBar} />
    </>
  );
};

export default UsersDashboardContent;
