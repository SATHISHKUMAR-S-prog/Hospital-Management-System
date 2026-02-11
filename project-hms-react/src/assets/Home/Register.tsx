import { Button, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import{  Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../states/Store';
import { fetchPatientProfile } from '../states/PatientSlice';
import { createPatient } from '../states/AuthSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
  
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  
  contact: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  gender: Yup.string()
    .required("Gender is required")
});


const Register =  ({setSignin}:{ setSignin:Dispatch<SetStateAction<string>>}) => {
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const {auth} = useAppSelector(store => store)
    const [ gender, setGender] = useState("MALE")


  const formik = useFormik({
        initialValues : {
            password:"",
            email:"",
            fullName:"",
            contact:"",
            confirmPassword:"",
            gender:gender
        },
       validationSchema,
        onSubmit: (values) => {
            console.log(values)
            dispatch(createPatient(values)).unwrap()
            .then(() => {
                enqueueSnackbar('Register Successfully.', {
                    variant: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                });
                if(auth.isLoggedIn){
                    navigate("/patient/account")
                    dispatch(fetchPatientProfile(localStorage.getItem("jwt") || ""))
                }
            })
            .catch (() => {
                enqueueSnackbar('Something went wrong.', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                });
            })
        },}
    )

        useEffect(()=>{
        if(auth.isLoggedIn){
            navigate("/patient/account")
            dispatch(fetchPatientProfile(localStorage.getItem("jwt") || ""))
        }
        },[auth.isLoggedIn,navigate])
   
const handleGenderChange = (gen:string) => {
    setGender(gen)
    formik.setFieldValue("gender",gen)
}
  return (
    <div className=''>
        <h1 className='text-center font-bold text-2xl py-5 text-primary-color h-full'>Register As Patient</h1>
        <div className='space-y-5 justify-self-end'>
        <div className=' space-y-3 gap-5 py-5 md:flex md:flex-auto md:justify-between sm:justify-center md:w-120 sm:w-80 lg:w-200 '>
        <Grid2 container spacing={3}>
        <Grid2 size={{xs:6}}>
            <TextField
                fullWidth
                className='col-span-6'
                name='fullName'
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
            />
            </Grid2>

            <Grid2 size={{xs:6}}>
            <TextField
                fullWidth
                className='col-span-6'
                name='email'
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
         </Grid2>

         <Grid2 size={{xs:6}}>
                <TextField
                    fullWidth
                    type='password'
                    name='password'
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                </Grid2>

                <Grid2 size={{xs:6}}>
                <TextField
                    fullWidth
                    type='password'
                    name='confirmPassword'
                    label="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                </Grid2>

                <Grid2 size={{xs:6}}>
                <TextField
                    fullWidth
                    name='contact'
                    label="Mobile No."
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contact && Boolean(formik.errors.contact)}
                    helperText={formik.touched.contact && formik.errors.contact}
                />
                </Grid2>

                <Grid2 size={{xs:6}}>
                <FormControl fullWidth className="mb-4">
                    <InputLabel>Gender</InputLabel>
                    <Select value={gender} onChange={(e) => handleGenderChange(e.target.value)}>
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMALE">Female</MenuItem>
                        <MenuItem value="TRANSGENDER">Transgender</MenuItem>
                    </Select>
                </FormControl>
                </Grid2>

                </Grid2>
            </div>
               
   
            <div className="w-60 justify-self-end rounded-r-full rounded-l-full pt-5">
                <Button className='rounded-full' onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py:"10px"}}>
                    {auth.loading ? <CircularProgress sx={{color:"white"}}/> :"Register"}
                   
                </Button>
               
            </div>
           
             { <p className="pb-3 text-lime-500 justify-self-end">
                    Don you have an account?{" "}
                   
                    <Button
                        onClick={() => setSignin("login")}
                        variant="text"
                        sx={{
                            textTransform: "none",
                            color: "#1976d2",
                            fontWeight: 500,
                            "&:hover": {
                            textDecoration: "underline",
                            backgroundColor: "transparent",
                            },
                        }}
                        >
                       Sign Up
                        </Button>
                    here
                </p>}
       
        </div>
    </div>
  )
}

export default Register