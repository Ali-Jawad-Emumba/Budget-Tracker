///expense content service functions

export const filterExpenseData = ({
  data,
  setData,
  sortValue,
  dateValue,
  search,
}: {
  data: any;
  setData: any;
  sortValue?: string;
  dateValue?: any | null;
  search?: string;
}) => {
  let result = [...data];
  // Apply sort filter
  if (sortValue) {
    switch (sortValue) {
      case 'low to high':
        result = result.sort((a: any, b: any) =>
          a.price === b.price ? 0 : a.price < b.price ? -1 : 1
        );
        break;
      case 'high to low':
        result = result.sort((a: any, b: any) =>
          a.price === b.price ? 0 : a.price < b.price ? 1 : -1
        );
        break;
      case 'old to new':
        result = result.sort((a: any, b: any) =>
          a.date === b.date ? 0 : new Date(a.date) > new Date(b.date) ? 1 : -1
        );
        break;
      case 'new to old':
        result = result.sort((a: any, b: any) =>
          a.date === b.date ? 0 : new Date(a.date) > new Date(b.date) ? -1 : 1
        );
        break;
    }
  }

  // Apply date filter
  if (dateValue) {
    result = result.filter(
      (expense: any) =>
        new Date(expense.date).toLocaleDateString() ===
        new Date(dateValue).toLocaleDateString()
    );
  }

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter((expense: any) =>
      expense.title.toLowerCase().includes(searchLower)
    );
  }

  setData(result);
};

///user content service functions
export const filterUsersData = ({
  data,
  setData,
  sortValue,
  search,
}: {
  data: any;
  setData: any;
  sortValue?: string;
  search?: string;
}) => {
  let result = [...data];
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

  setData(result);
};

///analysis content service functions
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
      .filter((expense: any) => new Date(expense.date).getMonth() + 1 >= month)
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

export const filterData = (data: any, sortValue: string, setChartData: any) => {
  const expenseData = [...data];
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
