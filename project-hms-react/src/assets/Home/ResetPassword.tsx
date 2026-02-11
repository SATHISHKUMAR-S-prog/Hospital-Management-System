import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../states/Store";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { resetPassword } from "../states/AuthSlice";
import { USER_ROLE } from "../Types/PatientType";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      email: auth.message,
      password: "",
      confirmPassword: "",
      role: USER_ROLE.PATIENT,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(resetPassword(values))
        .unwrap()
        .then(() => {
          enqueueSnackbar("Password reset successfully.", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
          navigate("/");
        })
        .catch(() => {
          enqueueSnackbar("Something went wrong.", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
        });
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 5, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Reset Your Password
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            type="password"
            name="password"
            label="Enter New Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword
            }
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: "12px", borderRadius: "30px" }}
            disabled={auth.loading}
          >
            {auth.loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
