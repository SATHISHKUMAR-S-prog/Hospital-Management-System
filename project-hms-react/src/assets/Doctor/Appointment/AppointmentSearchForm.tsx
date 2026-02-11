import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { Status } from "../../Types/AppointmentType";
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch } from "../../states/Store";
import { fetchAppointmentByDateAndStatus } from "../../states/DoctorSlice";
import { enqueueSnackbar } from "notistack";

interface appForm {
  date: Dayjs | null;
  status: Status;
}

export const statusList = [
    { name: "Active", value: Status.ACTIVE },
    { name: "Cancelled by Patient", value: Status.CANCELLED_BY_PATIENT },
    { name: "Cancelled by Doctor", value: Status.CANCELLED_BY_DOCTER },
    { name: "Postponed", value: Status.POSTPONED },
    { name: "Outdated", value: Status.OUTDATED },
    { name: "Prescribed", value: Status.PRESCRIBED },
    { name: "All", value: Status.ALL },
  ];
  

const AppointmentSearchForm = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [status, setStatus] = useState<Status>(Status.ALL);

  const dispatch = useAppDispatch()


  const formik = useFormik<appForm>({
    initialValues: {
      date: date || null ,
      status: status,
    },
    onSubmit: async (values) => {
        const formatedValues = {
            ...values,
            date: values.date ? values.date.format("YYYY-MM-DD") : null,
          };
        dispatch(fetchAppointmentByDateAndStatus(formatedValues)).unwrap() 
        .catch(() => {
        enqueueSnackbar("Something went wrong.",{
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        })
    },
  });

  // Strictly typed handler
  const handleStatusList = (st: Status) => {
    setStatus(st);
    formik.setFieldValue("status", st);
  };

  return (
    <div className="pb-5">
      <Box component="form" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2} alignItems="center">
            {/* Date Picker */}
            <Grid item xs={12} md={4}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Appointment Date"
                value={date}
                onChange={(newDate) => {
                  setDate(newDate);
                  formik.setFieldValue("date", newDate);
                }}
                minDate={dayjs()}
              />
            </Grid>

            {/* Status Dropdown */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={formik.values.status}
                  onChange={(e) => handleStatusList(e.target.value as Status)}
                >
                  {statusList.map((stat) => (
                    <MenuItem key={stat.value} value={stat.value}>
                      {stat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Search Button */}
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ py: "12px", borderRadius: "999px" }}
              >
                {false ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "Search"
                )}
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default AppointmentSearchForm;
