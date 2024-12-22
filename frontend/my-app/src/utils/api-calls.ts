import { BASE_URL } from './shared';
export const patchExpense = async (req: any) => {
  return await fetch(`${BASE_URL}/expenses/${req.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: req.data,
  });
};

export const postExpense = async (req: any) => {
  return await fetch(`${BASE_URL}/users/${req.id}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: req.data,
  });
};

export const getAllExpenses = async (userId: string | null) => {
  if (userId) {
    const fetchFn = await fetch(`${BASE_URL}/users/${userId}/all-expenses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response = await fetchFn.json();
    return response;
  }
};

export const getExpensesData = async (
  userId: string | null,
  selectedPage: number
) => {
  if (userId) {
    const fetchFn = await fetch(
      `${BASE_URL}/users/${userId}/expenses?page=${selectedPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getAllUsers = async (selectedPage: number) => {
  const fetchFn = await fetch(`${BASE_URL}/users?page=${selectedPage}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response = await fetchFn.json();
  return response;
};

export const deleteUserById = async (id: number | undefined) => {
  return await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateMyProfile = async (userId: string | null, reqBody: any) => {
  if (userId) {
    const updateDataFn = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
    await fetch(`${BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email,
      }),
    });
  }
};

export const updateAccountPassword = async (req: any) => {
  return await fetch(`${BASE_URL}/users/email/${req.email}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.data),
  });
};

export const fetchUserData = async (userId: string | null) => {
  if (userId) {
    const fetchFn = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response = await fetchFn.json();
    const data = response;
    return data;
  }
};
export const getAllExpensesForAdmin = async (selectedPage: number) => {
  const fetchFn = await fetch(`${BASE_URL}/expenses?page=${selectedPage}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response = await fetchFn.json();
  return response;
};
