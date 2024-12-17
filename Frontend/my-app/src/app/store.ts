import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  isAdmin: Boolean(localStorage.getItem("isAdmin")),
  selectedDashboardTab: "Expenses",
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
  },
});

export const { storeUserData, updateIsAdmin, storeSelectedDashboardTab } = slice.actions;

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
