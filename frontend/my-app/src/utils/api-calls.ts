import { resolve } from 'path';
import { BASE_URL } from './shared';
export const patchExpense = async (req: any) => {
  return await fetch(`${BASE_URL}/expenses/${req.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: req.data,
  });
};

export const postExpense = async (req: any) => {
  return await fetch(`${BASE_URL}/user/${req.id}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: req.data,
  });
};

export const getAllExpenses = async (userId: string | null) => {
  if (userId) {
    const fetchFn = await fetch(`${BASE_URL}/user/${userId}/all-expenses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response = await fetchFn.json();
    return response;
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
    const fetchFn = await fetch(
      `${BASE_URL}/user/${userId}/expenses?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const response = await fetchFn.json();
    return response;
  }
};

export const deleteExpenseById = async (id: number | undefined) => {
  return await fetch(`${BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
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

  const fetchFn = await fetch(`${BASE_URL}/admin/users?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response = await fetchFn.json();
  return response;
};

export const deleteUserById = async (id: number | undefined) => {
  return await fetch(`${BASE_URL}/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateMyProfile = async (userId: string | null, reqBody: any) => {
  if (userId) {
    const updateDataFn = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(reqBody),
    });
    const response = await updateDataFn.json();
    return response;
  }
};

export const getAccessToken = async () => {
  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refresh-token'),
    }),
  });
  const data = await response.json();
  return data;
};

export const sendPswdResetLink = async (email: any) => {
  if (email) {
    return await fetch(`${BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email,
      }),
    });
  }
};

export const updateAccountPassword = async (req: any) => {
  return await fetch(`${BASE_URL}/user/email/${req.email}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.data),
  });
};

export const fetchUserData = async (userId: string | null) => {
  if (userId) {
    const fetchFn = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response = await fetchFn.json();
    const data = response;
    return data;
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
  const fetchFn = await fetch(
    `${BASE_URL}/admin/all-users-expenses-with-pagination?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const response = await fetchFn.json();
  return response;
};

export const getAllExpensesForAdminChart = async () => {
  const fetchFn = await fetch(`${BASE_URL}/admin/all-users-expenses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response = await fetchFn.json();
  return response;
};

export const getYearTotalExpenses = async (userId?: string | null) => {
  if (userId) {
    const fetchFn = await fetch(
      `${BASE_URL}/user/${userId}/total-year-expense`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const response = await fetchFn.json();
    return response;
  }
};
export const getAllUsersYearTotalExpenses = async () => {
  const fetchFn = await fetch(`${BASE_URL}/admin/users/total-year-expense`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response = await fetchFn.json();
  return response;
};
