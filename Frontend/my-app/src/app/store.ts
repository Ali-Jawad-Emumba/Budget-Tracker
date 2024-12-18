import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
} from '@reduxjs/toolkit';
import { checkTokenExpiration } from '../utils/shared';

const initialState = {
  userData: null,
  isAdmin: import.meta.env.VITE_ADMIN_ID === localStorage.getItem('UserId'),
  isUserLoggedIn: localStorage.getItem('UserId') && checkTokenExpiration(),
  selectedDashboardTab: 'Expenses',
};

const slice = createSlice({
  name: 'Slice',
  initialState,
  reducers: {
    storeUserData(state, action) {
      state.userData = action.payload;
    },
    updateIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    storeSelectedDashboardTab(state, action) {
      state.selectedDashboardTab = action.payload;
    },
    updateIsUserLoggedIn(state, action) {
      state.isUserLoggedIn = action.payload;
    },
  },
});

export const {
  storeUserData,
  updateIsAdmin,
  storeSelectedDashboardTab,
  updateIsUserLoggedIn,
} = slice.actions;

export const store = configureStore({
  reducer: slice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
