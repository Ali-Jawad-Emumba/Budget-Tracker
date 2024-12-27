import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';
import styles from './DashboardContent.module.css';
import { DeleteIcon, EditIcon } from '../../utils/icons';
import { DataTableProps, InitialState } from '../../utils/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DeleteModal from '../modal/DeleteModal';
import { getAllUsersYearTotalExpenses, getYearTotalExpenses } from '../../utils/api-calls';
import ProgressBar from './ProgressBar';

const DataTable = ({
  useFor,
  data,
  setBeingEdit,
  setIsEditModalOpen,
  setSelectedPage,
  metaData,
  getData,
}: DataTableProps) => {
  const expenseCells = ['Expense', 'Total Expenditure', 'Price(PKR)', 'Date'];
  const userCells = ['First Name', 'Last Name', 'Email', 'Number', 'Role'];
  const isAdmin = useSelector((state: InitialState) => state.isAdmin);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<any>();
  const [yearTotalExpense, setYearTotalExpense] = useState<any>();
  const userId = useSelector((state: InitialState) => state.userId);
  const deleteItem = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };
  const shallShowUsers = isAdmin && useFor === 'Expenses';
  const shallShowRoles = isAdmin && useFor === 'Users';
  useEffect(() => {
    if (useFor === 'Expenses') {
      const fetchTotalExpenses = async () => {
        const totalExpense = isAdmin
          ? await getAllUsersYearTotalExpenses()
          : await getYearTotalExpenses(userId);
        setYearTotalExpense(totalExpense?.data);
      };
      fetchTotalExpenses();
    }
  }, []);
  useEffect(() => {
    if (useFor === 'Expenses') {
      const fetchTotalExpenses = async () => {
        const totalExpense = isAdmin
          ? await getAllUsersYearTotalExpenses()
          : await getYearTotalExpenses(userId);
        setYearTotalExpense(totalExpense?.data);
      };
      fetchTotalExpenses();
    }
  }, [data]);

  return (
    <>
      <TableContainer sx={{ borderRadius: '0 0 7px 7px' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              {[...(useFor === 'Expenses' ? expenseCells : userCells)].map(
                (cell: string, index: number) => (
                  <TableCell key={index}>{cell}</TableCell>
                )
              )}
              {shallShowUsers && <TableCell>User</TableCell>}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.title || row.firstname}
                </TableCell>
                <TableCell>
                  {useFor === 'Expenses' ? (
                    <ProgressBar expense={row} yearTotal={yearTotalExpense} />
                  ) : (
                    row.lastname
                  )}
                </TableCell>
                <TableCell>{row.price || row.email}</TableCell>
                <TableCell>
                  {useFor === 'Expenses'
                    ? new Date(row.date).toLocaleDateString()
                    : row.phone}
                </TableCell>
                {shallShowRoles && (
                  <TableCell>
                    {row._id === import.meta.env.VITE_ADMIN_ID
                      ? 'Admin'
                      : 'User'}
                  </TableCell>
                )}
                {shallShowUsers && <TableCell>{row.username}</TableCell>}
                <TableCell>
                  {
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div onClick={() => deleteItem(row)}>
                        <DeleteIcon />
                      </div>
                      <div
                        onClick={() => {
                          setBeingEdit(row), setIsEditModalOpen(true);
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
            Showing {data?.length}/{metaData?.totalRecords}
          </caption>
          <Pagination
            count={metaData?.totalPages}
            variant="outlined"
            shape="rounded"
            onChange={(_, page) => {
              setSelectedPage(page);
              getData();
            }}
          />
        </div>
      </TableContainer>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        useFor={useFor === 'Expenses' ? 'Expense' : 'User'}
        item={itemToDelete}
        reloadData={getData}
      />
    </>
  );
};

export default DataTable;
