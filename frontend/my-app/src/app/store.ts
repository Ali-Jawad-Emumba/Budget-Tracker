import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
} from '@reduxjs/toolkit';
import { checkTokenExpiration } from '../utils/shared';
import { InitialState } from '../utils/types';


const initialState: InitialState = {
  userData: {},
  isAdmin: import.meta.env.VITE_ADMIN_ID === localStorage.getItem('UserId'),
  isUserLoggedIn: Boolean(
    localStorage.getItem('UserId') &&
      checkTokenExpiration(Boolean(localStorage.getItem('refresh-token')))
  ),
  selectedDashboardTab: 'Expenses',
  keepLoggedIn: Boolean(localStorage.getItem('refresh-token')),
  notifications: [],
  userId:localStorage.getItem("UserId")
};

const slice = createSlice({
  name: 'Slice',
  initialState,
  reducers: {
    storeUserId(state, action){
      state.userId=action.payload
    },
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

    updateKeepLoggedIn(state, action) {
      state.keepLoggedIn = action.payload;
    },
 
    updateNotifications(state, action) {
      state.notifications = state.notifications.concat(action.payload);
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const {
  storeUserData,
  updateIsAdmin,
  storeSelectedDashboardTab,
  updateIsUserLoggedIn,
  updateKeepLoggedIn,
  updateNotifications,
  clearNotifications,
  storeUserId
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
