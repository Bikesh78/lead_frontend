import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, Paper, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CustomInput } from "../../components/CustomInput";
import { setLoginStatus, useLoginMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { failureToast } from "../../components/Toast";

interface LoginType {
  email: string;
  password: string;
}

const formValidator = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const defaultValues: LoginType = {
  email: "",
  password: "",
};

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(formValidator),
  });
  const [postLogin, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const styles = useStyles();

  const navigate = useNavigate();

  const submitHandler = (data: LoginType) => {
    const payload = {
      username: data.email,
      password: data.password,
    };

    postLogin(payload)
      .unwrap()
      .then((res) => {
        localStorage.setItem("lead_access_token", res?.token);
        dispatch(setLoginStatus(true));
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        failureToast(error?.data?.error);
      });
  };

  return (
    <Box className={styles.container}>
      <Paper elevation={3} className={styles.card}>
        <Box sx={{ textAlign: "center" }}>
          <AccountCircleIcon
            sx={{
              fill: "#4559BD",
              fontSize: "65px",
            }}
          />
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            color: "#4559BD",
            fontWeight: "500",
          }}
        >
          Sign In
        </Typography>
        <Box className={styles.formContainer}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <CustomInput
              name="email"
              placeholder="Email"
              control={control}
              error={errors?.email?.message}
              required
            />

            <CustomInput
              name="password"
              placeholder="Password"
              type="password"
              control={control}
              error={errors?.password?.message}
              required
            />

            <Box sx={{ marginTop: "25px" }}>
              <Button variant="contained" type="submit">
                {isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  card: {
    width: "350px",
    padding: "40px 15px",
    borderRadius: "4px",
  },
  formContainer: {
    padding: "10px 20px",
    display: "flex",
    columnGap: "10px",
    alignItems: "flex-start",
    "& form": {
      width: "100%",
    },
    "& .custom-input": {
      marginBlock: "15px",
    },
    "& button": {
      width: "100%",
      padding: "10px",
      fontSize: "12px",
    },
  },
}));

export default Login;
