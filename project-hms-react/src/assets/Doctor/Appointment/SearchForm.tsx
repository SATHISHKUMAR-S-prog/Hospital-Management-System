import { Search } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { searchAppointments } from "../../states/DoctorSlice";
import { useAppDispatch, useAppSelector } from "../../states/Store";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { searchDoctor, searchPatient } from "../../states/AdminSlice";

// Add `className` as prop to customize layout
const SearchForm = () => {
    const location = useLocation();
    const { docter , admin} = useAppSelector((store) => store);
    const dispatch = useAppDispatch();
  
    const formik = useFormik({
      initialValues: {
        query: "",
      },
      onSubmit: async (values) => {

        let action: any;

        action =
        location.pathname === "/doctor/appointment"
          ? searchAppointments(values.query)
          : location.pathname === "/admin/doctorlist"
          ? searchDoctor(values.query)
          : searchPatient(values.query);
      
      dispatch(action)
          .unwrap()
          .catch(() => {
            enqueueSnackbar("Something went wrong.", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
            });
          });
      },
    });
  
    return (
      <div className={`w-full max-w-md bg-white`}>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            size="small"
            name="query"
            label="Search"
            value={formik.values.query}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.query && Boolean(formik.errors.query)}
            helperText={formik.touched.query && formik.errors.query}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end">
                    {(docter.loading || admin.loading) ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Search />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </div>
    );
  };
  
  export default SearchForm;
  