import { useForm } from "react-hook-form";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
import {
  StyledButton,
  InputBootstrapStyled,
  CancelButton,
} from "../../utils/styled-components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import Notifictaion from "../notification/Notification";

import { useDispatch } from "react-redux";
import { updateNotifications } from "../../app/store";
import {
  checkResponseValidity,
  CloseButton,
  getCharactersMessage,
  requiredMessage,
} from "../../utils/shared";
import { patchExpense, postExpense } from "../../utils/api-calls";
import { ModalProps } from "../../utils/types";

const ExpenseModal = ({
  isOpen,
  setIsOpen,
  useFor,
  beingEdit,
  reloadData,
}: ModalProps) => {
  const userId = localStorage.getItem("UserId");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({ defaultValues: beingEdit, mode: "onChange" });
  const getExpenseBody = (data: any) =>
    JSON.stringify({
      title: data.title,
      price: data.price,
      date: expenseDate || new Date(),
    });
  const [expenseDate, setExpenseDate] = useState<any>();
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: "",
    title: "",
    description: "",
  });
  const maxLengthValidation = { value: 30, message: getCharactersMessage(30) };
  const editExpense = async (data: any) => {
    setIsLoading(true);
    const response = await patchExpense({
      id: beingEdit._id,
      data: getExpenseBody(data),
    });
    if (checkResponseValidity(response)) {
      setIsLoading(false);
      setIsOpen(false);
      setSnackBar({
        open: true,
        useFor: "edit",
        title: "Expense Updated",
        description: "Expense edited successfully",
      });

      setTimeout(() => setSnackBar(null), 5000);
      dispatch(
        updateNotifications({
          name: data.title,
          action: "edit",
          time: `${new Date()}`,
        })
      );
      reloadData();
    }
  };

  const addExpense = async (data: any) => {
    setIsLoading(true);
    const response = await postExpense({
      id: userId,
      data: getExpenseBody(data),
    });
    if (checkResponseValidity(response)) {
      setIsLoading(false);
      setIsOpen(false);
      setSnackBar({
        open: true,
        useFor: "add",
        title: "Expense Added",
        description: "Expense added successfully",
      });

      setTimeout(() => setSnackBar(null), 5000);
      dispatch(
        updateNotifications({
          name: data.title,
          action: "add",
          time: `${new Date()}`,
        })
      );
      reloadData();
    }
  };
  useEffect(() => {
    if (useFor === "Add") {
      reset();
      setExpenseDate(dayjs(new Date()));
    } else {
      setExpenseDate(dayjs(beingEdit?.date));
    }
    setIsLoading(false);
  }, [isOpen]);
  useEffect(() => {
    if (beingEdit) {
      reset(beingEdit); // Reset form to defaultValue when it changes
    }
  }, [beingEdit, reset]);

  return (
    <>
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <div className={styles.modal}>
          <DialogTitle>
            {useFor} Expense
            <CloseButton setIsOpen={setIsOpen} />
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleSubmit(
                useFor === "Add" ? addExpense : editExpense
              )}
            >
              <div className={styles.formWrapper}>
                <FormControl fullWidth>
                  <label>Title</label>
                  <InputBootstrapStyled
                    {...register("title", {
                      required: requiredMessage,
                      maxLength: maxLengthValidation,
                    })}
                    fullWidth
                    sx={{ height: "40px" }}
                  />
                </FormControl>
                <div className={styles.rowFlex}>
                  <FormControl>
                    <label>Price(PKR)</label>
                    <InputBootstrapStyled
                      {...register("price", {
                        required: requiredMessage,
                        maxLength: maxLengthValidation,
                      })}
                      sx={{ height: "40px" }}
                      type="number"
                    />
                  </FormControl>
                  <FormControl>
                    <label>Date</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="datePicker"
                        disableFuture={true}
                        value={dayjs(expenseDate)}
                        onChange={(event: any) =>
                          setExpenseDate(event.$d.toLocaleDateString())
                        }
                      />
                    </LocalizationProvider>
                  </FormControl>
                </div>
                <div className={styles.rowFlex}>
                  <CancelButton
                    sx={{ width: "45%", padding: "10px 0" }}
                    variant="outlined"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </CancelButton>
                  <StyledButton
                    sx={{
                      width: "50%",
                      borderRadius: "8px",
                      padding: "10px 0",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!isValid}
                  >
                    {isLoading ? (
                      <CircularProgress size={"30px"} color="inherit" />
                    ) : useFor === "Add" ? (
                      useFor
                    ) : (
                      "Save Changes"
                    )}
                  </StyledButton>
                </div>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
      <Notifictaion {...snackBar} />
    </>
  );
};

export default ExpenseModal;
