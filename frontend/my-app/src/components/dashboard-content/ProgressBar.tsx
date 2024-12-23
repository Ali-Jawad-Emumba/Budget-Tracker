import { Box, LinearProgress, Typography } from '@mui/material';

const ProgressBar = ({
  expense,
  yearTotal,
}: {
  expense: any;
  yearTotal: number;
}) => {
  const value = (expense.price / yearTotal) * 100;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          sx={{ height: 7, borderRadius: 4 }}
          variant="determinate"
          value={value}
        />
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

export default ProgressBar;
