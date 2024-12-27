import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "../utils/form-styles.module.css";
import {
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
} from "@mui/material";
import {
  InputBootstrapStyled,
  SignupLoginBtn,
} from "../utils/styled-components";
import {
  BASE_URL,
  checkAndThrowError,
  emailValidation,
  nameValidation,
  passwordValidation,
  requiredMessage,
} from "../utils/shared";
import PasswordField from "./password-field";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Notifictaion from "./notification/aNotification";
import { updateNotifications } from "../app/store";
import { useDispatch } from "react-redux";
import { SignupFormProps } from "../utils/types";

const SignUpForm = ({
  useFor,
  defaultValues,
  setModalOpen,
  reloadData,
}: SignupFormProps) => {
  const [showUserExisitsError, setShowUserExistsError] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const [snackBar, setSnackBar] = useState<any>({
    open: false,
    useFor: "",
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isModal = useFor.includes("modal");
  const navigate = useNavigate();
  const getSignupDataBody = (data: any) => {
    let result = {
      ...data,
      fathername: "",
      gender: "",
      phone: "",
      zipcode: "",
      education: "",
      dob: "",
      address: "",
      jobtitle: "",
      street: "",
      city: "",
      state: "",
      url: "",
      aboutme: "",
      profilepic: "",
    };
    delete result.confirmedpassword;
    return JSON.stringify(result);
  };
  const conditionalSize = isModal ? { width: "50%" } : { width: "100%" };
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const urlGetUserByEmail = `${BASE_URL}/user/email/${
      useFor === "edit modal" ? defaultValues.email : data.email
    }`;
    setIsLoading(true);
    const fetchFn = await fetch(urlGetUserByEmail);
    if (fetchFn.ok) {
      setIsLoading(false);
      const { userExists } = await fetchFn.json();
      if (userExists && useFor !== "edit modal") {
        setShowUserExistsError(true);
      } else {
        let response = await fetch(
          useFor === "edit modal" ? urlGetUserByEmail : `${BASE_URL}/user/`,
          {
            method: useFor === "edit modal" ? "PATCH" : "POST",
            headers:
              useFor === "edit modal"
                ? {
                    "Cotent-Type": "application/json",
                  }
                : {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            body: isModal ? JSON.stringify(data) : getSignupDataBody(data),
          }
        );

        if (useFor === "signup page" && response.ok) {
          navigate("/");
        }
        if (isModal) {
          setModalOpen(false);
          reloadData();
        }
        if (isModal && useFor === "edit modal") {
          setSnackBar({
            open: true,
            useFor: "add",
            title: "User Updated",
            description: "User edited successfully",
          });

          setTimeout(() => setSnackBar(null), 5000);
          dispatch(
            updateNotifications({
              name: `${data.firstname} ${data.lastname}`,
              action: "edit",
              time: `${new Date()}`,
            })
          );
        }
        if (isModal && useFor === "add modal") {
          setSnackBar({
            open: true,
            useFor: "add",
            title: "User Added",
            description: "User added successfully",
          });

          setTimeout(() => setSnackBar(null), 5000);
          dispatch(
            updateNotifications({
              name: `${data.firstname} ${data.lastname}`,
              action: "add",
              time: `${new Date()}`,
            })
          );
        }
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} ${styles.gapTen}`}
      >
        <div className={styles.signupFormFieldWrapper}>
          <FormControl sx={{ width: "50%" }}>
            <p className={styles.label}>First Name</p>
            <InputBootstrapStyled
              fullWidth
              {...register("firstname", nameValidation)}
              placeholder="test@exmaple.com"
            />
            {checkAndThrowError(errors, "firstname")}
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <p className={styles.label}>Last Name</p>
            <InputBootstrapStyled
              fullWidth
              {...register("lastname", nameValidation)}
              placeholder="test@exmaple.com"
            />
            {checkAndThrowError(errors, "lastname")}
          </FormControl>
        </div>
        <FormControl>
          <p className={styles.label}>Email</p>
          <InputBootstrapStyled
            fullWidth
            {...register("email", emailValidation)}
            onChange={() =>
              showUserExisitsError ? setShowUserExistsError(false) : null
            }
            placeholder="test@exmaple.com"
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
          />
          {checkAndThrowError(errors, "email")}
        </FormControl>
        <div
          className={isModal ? styles.signupFormFieldWrapper : styles.passwords}
        >
          <FormControl sx={conditionalSize}>
            <p className={styles.label}>Password</p>
            <PasswordField
              formRegister={{
                ...register("password", {
                  ...passwordValidation,
                }),
              }}
              checkAndThrowError={() => checkAndThrowError(errors, "password")}
            />
          </FormControl>
          {useFor === "signup page" && (
            <FormControl sx={conditionalSize}>
              <p className={styles.label}>Confirm Password</p>
              <PasswordField
                formRegister={{
                  ...register("confirmedpassword", {
                    ...passwordValidation,
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  }),
                }}
                checkAndThrowError={() =>
                  checkAndThrowError(errors, "confirmedpassword")
                }
              />
            </FormControl>
          )}
          <FormControl sx={conditionalSize}>
            <p className={styles.label}>Budget Limit</p>
            <InputBootstrapStyled
              fullWidth
              {...register("budgetlimit", {
                required: requiredMessage,
                max: 99999999,
              })}
              placeholder="Enter Amount"
              type="number"
            />
            {checkAndThrowError(errors, "budgetlimit")}
          </FormControl>

          {showUserExisitsError && (
            <p className="errors poppins-regular">
              This email is already registered
            </p>
          )}
        </div>
        {isModal && (
          <div className={styles.signupFormFieldWrapper}>
            <Button
              sx={{ width: "50%" }}
              variant="outlined"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" sx={{ width: "50%" }} variant="contained">
              Save
            </Button>
          </div>
        )}
        {useFor === "signup page" && (
          <>
            <SignupLoginBtn
              className={styles.loginBtn}
              type="submit"
              variant="contained"
            >
              {isLoading ? (
                <CircularProgress size={"30px"} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </SignupLoginBtn>
            <p className={`${styles.signupLine} poppins-regular`}>
              Already have an account?{" "}
              <Link className={`${styles.link} poppins-semibold`} to="/">
                Log In
              </Link>
            </p>
          </>
        )}
      </form>
      <Notifictaion {...snackBar} />
    </>
  );
};
export default SignUpForm;
