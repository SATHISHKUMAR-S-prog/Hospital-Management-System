import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../states/Store";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { sendEmail } from "../states/AuthSlice";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(sendEmail(values))
        .unwrap()
        .then(() => {
          enqueueSnackbar("Reset link sent to your email.", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
          navigate("/resetPassword");
        })
        .catch(() => {
          enqueueSnackbar("Patient not found.", {
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
          Forgot Password
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Enter your Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: "12px", borderRadius: "30px" }}
            disabled={auth.loading}
          >
            {auth.loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
