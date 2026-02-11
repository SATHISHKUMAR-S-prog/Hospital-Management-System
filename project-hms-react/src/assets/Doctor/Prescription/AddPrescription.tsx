import { Button, TextField, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { Appointment } from '../../Types/AppointmentType';
import { useAppDispatch } from '../../states/Store';
import { enqueueSnackbar } from 'notistack';
import { addPrescription } from '../../states/DoctorSlice';
import { useNavigate } from 'react-router-dom';

const AddPrescription = ({ appointment }: { appointment: Appointment | null }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      docter: appointment?.docter,
      patient: appointment?.patient,
      date: appointment?.date,
      time: appointment?.time,
      disease: '',
      cause: '',
      prescripe: '',
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(addPrescription({id:appointment?.id, prescription:values})).unwrap()
      .then(() => {
        enqueueSnackbar('Prescription Added.', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
        navigate("/doctor/prescription")
      })
      .catch (() => {
          enqueueSnackbar('Something went wrong.', {
              variant: 'error',
              anchorOrigin: { vertical: 'top', horizontal: 'center' },
          });
        },)
    }
})

 

  return (
    <Paper elevation={3} className="max-w-2xl mx-auto p-8 mt-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-primary-color mb-6">Prescription Details</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6 ">
        <TextField
          fullWidth
          name="disease"
          label="Disease"
          value={formik.values.disease}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.disease && Boolean(formik.errors.disease)}
          helperText={formik.touched.disease && formik.errors.disease}
        />

        <TextField
          fullWidth
          name="cause"
          label="Causes / Allergies"
          value={formik.values.cause}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cause && Boolean(formik.errors.cause)}
          helperText={formik.touched.cause && formik.errors.cause}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          name="prescripe"
          label="Prescriptions"
          value={formik.values.prescripe}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.prescripe && Boolean(formik.errors.prescripe)}
          helperText={formik.touched.prescripe && formik.errors.prescripe}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5, fontWeight: 'bold', borderRadius: '999px' }}
        >
          Submit Prescription
        </Button>
      </form>
    </Paper>
  );
};

export default AddPrescription;
