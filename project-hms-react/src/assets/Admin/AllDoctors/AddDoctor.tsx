import { Button, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
// import { USER_ROLE } from '../../Types/PatientType';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch } from '../../states/Store';
import { addDoctor } from '../../states/AdminSlice';
// import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; 
import { useNavigate } from 'react-router-dom';

const AddDoctor =  () => {

    const validationSchema = Yup.object({
        name: Yup.string().required("Full Name is required"),
        username: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required"),
        fees: Yup.string().required("Fees is required"),
        mobileNo: Yup.string()
            .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
            .required("Mobile No. is required"),
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


    const dispatch = useAppDispatch()
    const navigate = useNavigate()
     const [specializations,setSpecialization] = useState("CARDIOLOGY")


  const formik = useFormik({
        initialValues : {
           name:"",
           username:"",
           email:"",
           password:"",
           confirmPassword:"",
           specialization:"",
           fees:"",
           mobileNo:""
        //    role:USER_ROLE.DOCTOR
        },validationSchema,
        onSubmit: (values) => {
            console.log({ ...values, specialization: specializations })
            dispatch(addDoctor({ ...values, specialization: specializations })).unwrap()
            .then(() => {
                enqueueSnackbar('Doctor Added.', {
                    variant: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                });
                navigate("/admin/doctorlist")
            })
            .catch (() => {
                enqueueSnackbar('Something went wrong or wrong otp.', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                });
            })
        },}
    )

  return (
    <div className=''>
        <h1 className='text-center font-bold text-2xl py-5 text-primary-color h-full'>Add Doctor</h1>
        <div className='space-y-5 justify-self-center'>
        <div className=' space-y-3 gap-5 py-5 md:flex md:flex-auto md:justify-between sm:justify-center md:w-120 sm:w-80 lg:w-200 '>
        <Grid2 container spacing={3}>
        <Grid2 size={{xs:12}}>
            <TextField
                fullWidth
                className='col-span-6'
                name='name'
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            </Grid2>

            <Grid2 size={{xs:12}}>
            <TextField
                fullWidth
                className='col-span-6'
                name='username'
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            </Grid2>

            <Grid2 size={{xs:12}}>
                <FormControl fullWidth className="mb-4">
                    <InputLabel>Specialist</InputLabel>
                    <Select value={specializations} onChange={(e) => setSpecialization(e.target.value)}>
                    {specializationList.map((spec) => (
                        <MenuItem key={spec.value} value={spec.value}>
                        {spec.name}
                        </MenuItem>
                    ))}
                    
                    </Select>
                </FormControl>
            </Grid2>

            <Grid2 size={{xs:12}}>
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

         <Grid2 size={{xs:12}}>
                <TextField
                    fullWidth
                    type="password"
                    name='password'
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                </Grid2>

                <Grid2 size={{xs:12}}>
                <TextField
                    fullWidth
                    type="password"
                    name='confirmPassword'
                    label="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                </Grid2>

                <Grid2 size={{xs:12}}>
                <TextField
                    fullWidth
                    name='fees'
                    label="Fees in rupees"
                    value={formik.values.fees}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fees && Boolean(formik.errors.fees)}
                    helperText={formik.touched.fees && formik.errors.fees}
                />
                </Grid2>

                <Grid2 size={{xs:12}}>
                <TextField
                    fullWidth
                    name='mobileNo'
                    label="Mobile No."
                    value={formik.values.mobileNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                    helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                />
                </Grid2>

                

                </Grid2>
            </div>
               
   
            <div className="w-60 justify-self-center rounded-r-full rounded-l-full pt-5">
                <Button className='rounded-full' onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py:"10px"}}>
                    {false ? <CircularProgress sx={{color:"white"}}/> :"Add Doctor"}
                   
                </Button>
               
            </div>
   
       
        </div>
    </div>
  )
}

export default AddDoctor