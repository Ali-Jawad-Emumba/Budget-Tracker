export interface LoginSignupLayoutProp {
  image: string;
  children?: any;
}
export interface LogoProps {
  useFor: string;
}

export interface AppBarProps {
  useFor: string;
  toggleDrawer?: any;
}

export interface InitialState {
  userData: any;
  isAdmin: boolean;
  isUserLoggedIn: boolean;
  selectedDashboardTab: string;
  keepLoggedIn: boolean;
  expenseAllData: any;
  notifications: any;
  userId: string | null;
}

export interface ChartData {
  name: string | number;
  value: number;
}

export interface DashboardContentLayoutProps {
  title: string;
  tableTitle: string;
  button: any;
  filters: any;
  children: any;
}

export interface DataTableProps {
  useFor: string;
  data: any;
  setBeingEdit: any;
  setIsEditModalOpen: any;
  setSelectedPage: any;
  metaData: any;
  getData: any;
  deleteItem: any;
}

export interface FilterProps {
  title: string;
  children: any;
}
export interface NotificationProps {
  useFor: string;
  open: boolean;
  title: string;
  description: string;
}

export interface PasswordFieldProps {
  formRegister: any;
  checkAndThrowError: any;
  changeHandler?: any;
}
export interface SignupFormProps {
  useFor: string;
  defaultValues?: any;
  setModalOpen?: any;
  reloadData?: any;
}
export interface ModalProps {
  isOpen: boolean;
  setIsOpen: any;
  useFor: string;
  beingEdit?: any;
  reloadData?: any;
}
