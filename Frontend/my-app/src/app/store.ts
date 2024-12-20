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
  callHeaders:{
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  },
  keepLoggedIn:localStorage.getItem("refresh-token")
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
    setCallsHeader(state, action){
      state.callHeaders={
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${action.payload}`,
      }
    },
    updateKeepLoggedIn(state, action){
      state.keepLoggedIn=action.payload
    }
  },
});

export const {
  storeUserData,
  updateIsAdmin,
  storeSelectedDashboardTab,
  updateIsUserLoggedIn,
  setCallsHeader,
  updateKeepLoggedIn
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
