import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  selectedDashboardTab: 'Expenses',
  seletedProfileTab: 'Profile',
};
const slice = createSlice({
  name: 'Slice',
  initialState,
  reducers: {
    updateSelectedDashboardTab(state, action) {
      state.selectedDashboardTab = action.payload;
    },
    updateSelectedProfileTab(state, action) {
      state.seletedProfileTab = action.payload;
    },
  },
});

export const { updateSelectedDashboardTab, updateSelectedProfileTab } =
  slice.actions;

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
