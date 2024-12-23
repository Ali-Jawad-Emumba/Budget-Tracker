import { StyledButton } from '../../utils/styled-components';
import styles from './DashboardContent.module.css';
import { InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect, useState } from 'react';

import DataTable from './DataTable';
import DashboardContentLayout from './DashboardContentLayout';
import Filter from './Filter';
import UserModal from '../modal/UsersModal';
import Notifictaion from '../notification/Notification';
import { useDispatch } from 'react-redux';
import { updateNotifications } from '../../app/store';
import { deleteUserById, getAllUsers } from '../../utils/api-calls';
import { fetchDashboardData } from '../../utils/shared';

const UsersDashboardContent = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
    useState<boolean>(false);

  const [originalUsersData, setOriginalUsersData] = useState<any[]>();
  const [filteredUsersData, setFilteredUsersData] = useState<any[]>();
  const [expenseBeingEdit, setUserBeingEdit] = useState<any>();
  const [sortFilterValue, setSortFilterValue] = useState<string>('');

  const [search, setSearch] = useState<string>('');
  const [expenseMetaData, setUserMetaData] = useState<any>();
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: '',
    title: '',
    description: '',
  });
  const [token, setToken] = useState<string | null>(null);
  const [tokenCheckInterval, setTokenCheckInterval] = useState<any>();

  const getUsers = async (filters?: { sort: string; search: string }) => {
    const response = await getAllUsers(
      selectedPage,
      filters?.sort,
      filters?.search
    );
    setUserMetaData(response);
    const data = response.data;
    setOriginalUsersData(data);
    setFilteredUsersData(data);
  };

  useEffect(() => {
    fetchDashboardData(
      getUsers,
      originalUsersData,
      setToken,
      setTokenCheckInterval
    );
  }, []);
  useEffect(() => {
    const fetchData = async () => await getUsers();
    fetchData();
    if (tokenCheckInterval) clearInterval(tokenCheckInterval);
  }, [token]);

  return (
    <>
      <DashboardContentLayout
        title="Users"
        tableTitle="Users"
        button={
          <StyledButton
            onClick={() => setIsAddUserModalOpen(true)}
            sx={{ margin: 'auto 0' }}
          >
            Add User
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
                  await getUsers({
                    sort: e.target.value,
                    search,
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
                onInput={async (e: any) => {
                  setSearch(e.target.value);
                  await getUsers({
                    sort: sortFilterValue,
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
          beingEdit={expenseBeingEdit}
          reloadData={getUsers}
        />
      </DashboardContentLayout>

      <Notifictaion {...snackBar} />
    </>
  );
};

export default UsersDashboardContent;
