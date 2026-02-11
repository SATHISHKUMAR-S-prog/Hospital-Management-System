import { useFormik } from "formik";
import { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useAppDispatch } from "../../states/Store";
import { enqueueSnackbar } from "notistack";
import { fetchDoctorByStatus } from "../../states/AdminSlice";
import { DoctorStatus } from "../../Types/DoctorType";

export const doctorStatusList = [
    { name: "ACTIVE", value: DoctorStatus.ACTIVE },
    { name: "SUSPENDED", value: DoctorStatus.SUSPENDED },
    { name: "TERMINATED", value: DoctorStatus.TERMINATED },
    {name: "ALL" ,value: DoctorStatus.ALL}
  ];

const SearchDoctorByStatusForm = () => {

interface appForm {
  status: DoctorStatus;
}

  const [status, setStatus] = useState<DoctorStatus>(DoctorStatus.ALL);
  const dispatch = useAppDispatch()


  const formik = useFormik<appForm>({
    initialValues: {
      status: status,
    },
    onSubmit: async () => {
       
        dispatch(fetchDoctorByStatus(status)).unwrap() 
        .catch(() => {
        enqueueSnackbar("Something went wrong.",{
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        })
    },
    
  });

  const handleStatusList = async (st: DoctorStatus) => {
    setStatus(st);
    await formik.setFieldValue("status", st);
    formik.handleSubmit()
  };

  return (
    <div className="pb-5">
      <Box component="form" sx={{ mt: 3 }}>
        
          <Grid container spacing={2} alignItems="center">  
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={formik.values.status}
                  onChange={(e) => handleStatusList(e.target.value as DoctorStatus)}
                >
                  {doctorStatusList.map((stat) => (
                    <MenuItem key={stat.value} value={stat.value}>
                      {stat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
      
      </Box>
    </div>
  );
};

export default SearchDoctorByStatusForm