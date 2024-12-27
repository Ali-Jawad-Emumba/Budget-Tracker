import { BASE_URL } from './shared';
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const patchExpense = async (req: any) => {
  return await axios.patch(`${BASE_URL}/expenses/${req.id}`, req.data);
};

export const postExpense = async (req: any) => {
  return await axios.post(`${BASE_URL}/user/${req.id}/expenses`, req.data);
};

export const getAllExpenses = async (userId: string | null) => {
  if (userId) {
    return await axios.get(`${BASE_URL}/user/${userId}/all-expenses`);
  }
};

export const getExpensesData = async (
  userId: string | null,
  selectedPage: number,
  sortValue?: string,
  dateFilter?: string,
  search?: string
) => {
  if (userId) {
    const queryParams = new URLSearchParams({
      page: selectedPage.toString(),
    });
    if (sortValue) queryParams.append('sort', sortValue);
    if (search) queryParams.append('search', search);
    if (dateFilter) {
      queryParams.append('date', dateFilter);
    }
    return await axios.get(
      `${BASE_URL}/user/${userId}/expenses?${queryParams.toString()}`
    );
  }
};

export const deleteExpenseById = async (id: number | undefined) => {
  return await axios.delete(`${BASE_URL}/expenses/${id}`);
};

export const getAllUsers = async (
  selectedPage: number,
  sortValue?: string,
  search?: string
) => {
  const queryParams = new URLSearchParams({
    page: selectedPage.toString(),
  });
  if (sortValue) queryParams.append('sort', sortValue);
  if (search) queryParams.append('search', search);

  return await axios.get(`${BASE_URL}/admin/users?${queryParams.toString()}`);
};

export const deleteUserById = async (id: number | undefined) => {
  return await axios.delete(`${BASE_URL}/user/${id}`);
};

export const updateMyProfile = async (userId: string | null, reqBody: any) => {
  if (userId) {
    return await axios.patch(
      `${BASE_URL}/user/${userId}`,
      JSON.stringify(reqBody)
    );
  }
};

export const getAccessToken = async () => {
  return await axios.post(
    `${BASE_URL}/refresh-token`,
    JSON.stringify({
      refreshToken: localStorage.getItem('refresh-token'),
    })
  );
};

export const sendPswdResetLink = async (email: any) => {
  if (email) {
    const data = JSON.stringify({
      email,
    });
    return await axios.post(`${BASE_URL}/reset-password`, data);
  }
};

export const updateAccountPassword = async (req: any) => {
  return await axios.patch(
    `${BASE_URL}/user/email/${req.email}`,
    JSON.stringify(req.data)
  );
};

export const fetchUserData = async (userId: string | null) => {
  if (userId) {
    return await axios.get(`${BASE_URL}/user/${userId}`);
  }
};
export const getAllExpensesForAdminTable = async (
  selectedPage: number,
  sortValue?: string,
  dateFilter?: string,
  search?: string
) => {
  const queryParams = new URLSearchParams({
    page: selectedPage.toString(),
  });
  if (sortValue) queryParams.append('sort', sortValue);
  if (search) queryParams.append('search', search);
  if (dateFilter) {
    queryParams.append('date', dateFilter);
  }
  return await axios.get(
    `${BASE_URL}/admin/all-users-expenses-with-pagination?${queryParams.toString()}`
  );
};

export const getAllExpensesForAdminChart = async () => {
  return await axios.get(`${BASE_URL}/admin/all-users-expenses`);
};

export const getYearTotalExpenses = async (userId?: string | null) => {
  if (userId) {
    return await axios.get(`${BASE_URL}/user/${userId}/total-year-expense`);
  }
};
export const getAllUsersYearTotalExpenses = async () => {
  return await axios.get(`${BASE_URL}/admin/users/total-year-expense`);
};
