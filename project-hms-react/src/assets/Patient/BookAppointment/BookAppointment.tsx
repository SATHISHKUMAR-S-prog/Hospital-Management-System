import { Box, Button, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import { useFormik } from "formik";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Doctor, Specialization } from "../../Types/DoctorType";
import { patient } from "../../Types/PatientType";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../states/Store";
import { bookAppointment, fetchDoctorBySpecialist, fetchPatientProfile } from "../../states/PatientSlice";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

dayjs.extend(utc)
interface appointmentFormValues {
    specialization:Specialization   
    docter:Doctor | undefined,
    patient:patient | null,
    fees: number | undefined,
  date:Dayjs|null,
  time:string,
}

const validationSchema = Yup.object().shape({
    specialization: Yup.string().required("Specialization is required"),
    docter: Yup.object().required("Doctor is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
  });
  

const specializationList = [
    { name: "Cardiology", value: "CARDIOLOGY" },
    { name: "Neurology", value: "NEUROLOGY" },
    { name: "Endocrinology", value: "ENDOCRINOLOGY" },
    { name: "Gastroenterology", value: "GASTROENTEROLOGY" },
    { name: "Nephrology", value: "NEPHROLOGY" },
    { name: "Pulmonology", value: "PULMONOLOGY" },
    { name: "Hematology", value: "HEMATOLOGY" },
    { name: "Rheumatology", value: "RHEUMATOLOGY" },
    { name: "Allergy & Immunology", value: "ALLERGY_IMMUNOLOGY" },
    { name: "Dermatology", value: "DERMATOLOGY" },
    { name: "Infectious Disease", value: "INFECTIOUS_DISEASE" },
    { name: "Oncology", value: "ONCOLOGY" },
  ];
  
  const time = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM"
  ]


const BookAppointment = () => {

    const {patient} = useAppSelector(store => store)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [specializations,setSpecialization] = useState<Specialization | any>("CARDIOLOGY")
    const [date, setDate] = useState<Dayjs | null>(null);
    const [appTime, setAppTime] = useState("9:00 AM")
    const [doc, setDoc] = useState<Doctor | undefined>(undefined);
    const [pat, setPat] = useState<patient | null>(null)

    useEffect(() => {
            dispatch(fetchDoctorBySpecialist(specializations));
            dispatch(fetchPatientProfile(localStorage.getItem("jwt") || ""))
      }, [specializations]);

      useEffect(() => {
        if (
          patient.docters.length > 0 &&
          (!doc || doc.id !== patient.docters[0].id)
        ) {
          const firstDoctor = patient.docters[0];
          setPat(patient?.patient)
          setDoc(firstDoctor);
          formik.setFieldValue("docter", firstDoctor, false); // 'false' to prevent validation
          formik.setFieldValue("fees", firstDoctor.fees || null, false);
        }

      }, [patient.docters, doc]);
      
      useEffect(() => {
        if (patient.patient) {
          setPat(patient.patient);
          formik.setFieldValue("patient", patient.patient); // ✅ Update formik
        }
      }, [patient.patient]);
    

const formik = useFormik<appointmentFormValues>({
    initialValues: {
        specialization: specializations as Specialization,
        docter: doc || undefined,
        patient: pat,
        fees: doc?.fees || undefined,
        date: date || dayjs(),
        time: appTime
    },
    validationSchema,
    onSubmit: (values) => {
      const formatedValues = {
        ...values,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
      };
      console.log(formatedValues);
      dispatch(bookAppointment(formatedValues)).unwrap()
      .then(()=>{
        enqueueSnackbar("Appointment booked.",{
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      navigate("/patient/appointment")
      }).catch(() => {
        enqueueSnackbar("Something went wrong.",{
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      })

      console.log(formatedValues);
    }
  });

  const handleSpecialist = async (special:any) => {
    // handleOpen()
    setSpecialization(special)
    await dispatch(fetchDoctorBySpecialist(special))
    .then(() =>{
        if (
            patient.docters.length > 0 &&
            (!doc || doc.id !== patient.docters[0].id)
          ) {
            const firstDoctor = patient.docters[0];
            setDoc(firstDoctor);
            formik.setFieldValue("docter", firstDoctor, false); // 'false' to prevent validation
            formik.setFieldValue("fees", firstDoctor?.fees || null, false);
          } else {
            setDoc(undefined);
            formik.setFieldValue("docter", undefined);
            formik.setFieldValue("fees", ""); 
          }
    })
  }

  const handleDoctor = (id: any) => {
    const selectedDoctor = patient.docters.find((docs) => docs.id === id);
    setDoc(selectedDoctor);
    formik.setFieldValue("docter", selectedDoctor); 
    formik.setFieldValue("fees", selectedDoctor?.fees || null);
  };

    return (

    <div className=" md:max-w-[80%] flex flex-col justify-self-center px-5 md:px-10 md:pb-10 pb-5">    
    
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <Box component={"form"} sx={{mt:3}} onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={2}>
            <Grid2 size={{xs:12}}>
                <FormControl fullWidth className="mb-4">
                    <InputLabel>Specialist</InputLabel>
                    <Select value={specializations} onChange={(e) => handleSpecialist(e.target.value)}>
                    {specializationList.map((spec) => (
                        <MenuItem key={spec.value} value={spec.value}>
                        {spec.name}
                        </MenuItem>
                    ))}
                    
                    </Select>
                </FormControl>
                </Grid2>

                <Grid2 size={{xs:12}}>
                <FormControl fullWidth className="mb-4">
                    <InputLabel>Doctor</InputLabel>
                    <Select value={doc?.id || ""} onChange={(e) => handleDoctor(e.target.value)} required>
                    {patient.docters.length === 0 ? (
                        <MenuItem value="" disabled>
                        No doctors available
                        </MenuItem>
                    ) : (
                        patient.docters.map((spec) => (
                        <MenuItem key={spec.id} value={spec?.id || ""}>
                            {spec.name}
                        </MenuItem>
                        ))
                    )}
                    
                    </Select>
                </FormControl>
                </Grid2>

                <Grid2 size={{xs:12}}>
                <TextField
                    fullWidth
                    required
                    name='fees'
                    label="Doctor Fees"
                    value={`₹ ${formik.values.fees || ""}`}
                    disabled
                    />
            </Grid2>

            <Grid2 size={{xs:12}}>
            <DatePicker
                    sx={{ width: "100%" }}
                    label="Appointment Date"
                    value={date || dayjs()}
                    onChange={(newDate) => {
                        setDate(newDate);
                        formik.setFieldValue("date", newDate); // optional if you still want it in formik
                    }}
                    minDate={dayjs()}
                />
            </Grid2>

            <Grid2 size={{xs:12}}>
                <FormControl fullWidth className="mb-4">
                    <InputLabel>Appointment Time</InputLabel>
                    <Select value={appTime}
                        onChange={(e) => {
                            const selectedTime = e.target.value;
                            setAppTime(selectedTime);
                            formik.setFieldValue("time", selectedTime); // ✅ update Formik too!
                          }}>
                    {time.map((time) => (
                        <MenuItem key={time} value={time}>
                        {time}
                        </MenuItem>
                    ))}
                    
                    </Select>
                </FormControl>
                </Grid2>
                <Grid2 size={{xs:12}}>
                <Button
                    className="rounded-full"
                    fullWidth
                    variant="contained"
                    sx={{ py: "10px" }}
                    type="submit"
                >
                    {patient.loading ? <CircularProgress sx={{ color: "white" }} /> : "Book Appointment"}
                </Button>
                </Grid2>
            </Grid2>
        </Box>
        </LocalizationProvider>

    </div>
);
}

export default BookAppointment