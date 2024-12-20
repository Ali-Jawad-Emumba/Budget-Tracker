import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  LinearProgress,
  Typography,
} from '@mui/material';
import styles from './DashboardContent.module.css';
import { DeleteIcon, EditIcon } from '../../pages/dashboard/DashboardIcons';
const DataTable = ({
  useFor,
  data,
  setBeingEdit,
  setIsEditModalOpen,
  setSelectedPage,
  metaData,
  getData,
  deleteItem,
}: {
  useFor: string;
  data: any;
  setBeingEdit: any;
  setIsEditModalOpen: any;
  setSelectedPage: any;
  metaData: any;
  getData: any;
  deleteItem: any;
}) => {
  const expenseCells = ['Expense', 'Total Expenditure', 'Price(PKR)', 'Date'];
  const userCells = ['First Name', 'Last Name', 'Email', 'Number', 'Role'];
  const ProgressBar = ({ expense }: { expense: any }) => {
    const totalExpenseOfMonth = data
      .filter(
        (item: any) =>
          new Date(item.date).getMonth() + 1 ===
            new Date(expense.date).getMonth() + 1 &&
          new Date(item.date).getFullYear() ===
            new Date(expense.date).getFullYear()
      )
      .reduce((sum: number, element: any) => (sum += element.price), 0);
    const value = (expense.price / totalExpenseOfMonth) * 100;
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
    <TableContainer sx={{ borderRadius: '0 0 7px 7px' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            {[...(useFor === 'Expenses' ? expenseCells : userCells)].map(
              (cell: string) => (
                <TableCell>{cell}</TableCell>
              )
            )}
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
                  <ProgressBar expense={row} />
                ) : (
                  row.lastname
                )}
              </TableCell>
              <TableCell>{row.price || row.email}</TableCell>
              <TableCell>{row.date || row.phone}</TableCell>
              <TableCell>
                {
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div onClick={() => deleteItem(row._id)}>
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
  );
};

export default DataTable;
