import { Button, CircularProgress, FormControl } from "@mui/material";
import {
  StyledButton,
  InputBootstrapStyled,
} from "../../utils/styled-components";
import ProfileCard from "../profile-details/profile-card";
import styles from "./my-account.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { storeUserData } from "../../app/store";
import {
  emailValidation,
  nameValidation,
  requiredMessage,
} from "../../utils/shared";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { updateMyProfile } from "../../utils/api-calls";
import { InitialState } from "../../utils/types";

const MyAccount = () => {
  const userData = useSelector((state: InitialState) => state.userData);
  const { register, handleSubmit } = useForm({ defaultValues: userData });
  const [DOB, setDOB] = useState<string>("");
  const dispatch = useDispatch();
  const userId = useSelector((state: InitialState) => state.userId);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const updatedData = await updateMyProfile(userId, { ...data, dob: DOB });
    if (updatedData?.data) {
      setIsLoading(false);
      dispatch(storeUserData(updatedData?.data));
    }
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <ProfileCard heading="My Account">
        <div style={{ padding: "20px 40px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.accountDetailDiv}>
              <h2>Name & Job</h2>
              <div className={styles.accountField}>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>First Name</label>
                  <InputBootstrapStyled
                    {...register("firstname", nameValidation)}
                  />
                </FormControl>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Last Name</label>
                  <InputBootstrapStyled
                    {...register("lastname", nameValidation)}
                  />
                </FormControl>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Job Title</label>
                  <InputBootstrapStyled {...register("jobtitle")} />
                </FormControl>
              </div>
            </div>
            <div className={styles.accountDetailDiv}>
              <h2>About Me</h2>
              <div className={styles.accountField}>
                <FormControl fullWidth>
                  <InputBootstrapStyled {...register("aboutme")} />
                </FormControl>
              </div>
            </div>

            <div className={styles.accountDetailDiv}>
              <h2>Address</h2>
              <div className={styles.accountField} style={{ flexWrap: "wrap" }}>
                <FormControl className={styles.widthTwentyFivePercent}>
                  <label>Street Address</label>
                  <InputBootstrapStyled {...register("street")} />
                </FormControl>
                <FormControl className={styles.widthTwentyFivePercent}>
                  <label>City</label>
                  <InputBootstrapStyled {...register("city")} />
                </FormControl>
                <FormControl className={styles.widthTwentyFivePercent}>
                  <label>State</label>
                  <InputBootstrapStyled {...register("state")} />
                </FormControl>

                <FormControl className={styles.widthTwentyFivePercent}>
                  <label>Zip Code</label>
                  <InputBootstrapStyled
                    {...register("zipcode")}
                    type="number"
                  />
                </FormControl>
                <FormControl style={{ width: "100%" }}>
                  <label>Complete Address</label>
                  <InputBootstrapStyled {...register("address")} />
                </FormControl>
              </div>
            </div>

            <div className={styles.accountDetailDiv}>
              <h2>Contact Info</h2>
              <div className={styles.accountField}>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Phone Number</label>
                  <InputBootstrapStyled {...register("phone")} type="number" />
                </FormControl>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Email</label>
                  <InputBootstrapStyled
                    {...register("email", emailValidation)}
                  />
                </FormControl>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Website URL</label>
                  <InputBootstrapStyled {...register("url")} />
                </FormControl>
              </div>
            </div>
            <div className={styles.accountDetailDiv}>
              <h2>Bio</h2>
              <div className={styles.accountField}>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Date of Birth</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="datePicker"
                      disableFuture={true}
                      value={dayjs(DOB)}
                      onChange={(event: any) =>
                        setDOB(event.$d.toLocaleDateString())
                      }
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Eductaion</label>
                  <InputBootstrapStyled {...register("education")} />
                </FormControl>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Gender</label>
                  <InputBootstrapStyled {...register("gender")} />
                </FormControl>
              </div>
            </div>
            <div
              className={styles.accountDetailDiv}
              style={{ borderBottom: 0 }}
            >
              <h2>Financial Budget</h2>
              <div className={styles.accountField}>
                <FormControl className={styles.widthThirtyPercent}>
                  <label>Budget</label>
                  <InputBootstrapStyled
                    {...register("budgetlimit", {
                      required: requiredMessage,
                      max: 99999999,
                    })}
                    type="number"
                  />
                </FormControl>
              </div>
            </div>

            <div>
              <StyledButton type="submit">
                {isLoading ? (
                  <CircularProgress size={"30px"} color="inherit" />
                ) : (
                  "Update"
                )}
              </StyledButton>
              <Button
                variant="text"
                sx={{ width: "100px", fontSize: "0.75rem", color: "black" }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </ProfileCard>
    </div>
  );
};
export default MyAccount;
