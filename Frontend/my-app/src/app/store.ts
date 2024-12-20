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
  isUserLoggedIn: localStorage.getItem('UserId') && checkTokenExpiration(Boolean(localStorage.getItem("refresh-token"))),
  selectedDashboardTab: 'Expenses',
  keepLoggedIn:localStorage.getItem("refresh-token"),
  expenseAllData:null
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
 
    updateKeepLoggedIn(state, action){
      state.keepLoggedIn=action.payload
    },
    storeExpenseAllData(state,action){
      state.expenseAllData=action.payload
    }
  },
});

export const {
  storeUserData,
  updateIsAdmin,
  storeSelectedDashboardTab,
  updateIsUserLoggedIn,
  updateKeepLoggedIn,
  storeExpenseAllData
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
