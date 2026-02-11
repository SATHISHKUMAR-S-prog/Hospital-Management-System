import { Button, CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useEffect } from 'react';
// import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../states/Store';
import { useSnackbar } from 'notistack';
import { login } from '../states/AuthSlice';
import { fetchPatientProfile } from '../states/PatientSlice';

const Login = ({rolee,setSignin}:{rolee:string, setSignin:Dispatch<SetStateAction<string>>}) => {
    const dispatch = useAppDispatch()

    const {auth} = useAppSelector(store => store)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()


  const formik = useFormik({
        initialValues : {
            password:"",
            email:"",
            role:rolee.toUpperCase()
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log(values)
            await dispatch(login(values)).unwrap()
            .then(()=>{
                enqueueSnackbar('Login successfully.', {
                    variant: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                });
                if(auth.isLoggedIn){
                    send();
                }
            })
            .catch (() => {
                enqueueSnackbar('username or password is wrong.', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                });
            })

            console.log(auth)
            
        },}
    )

    const send = () => {
        if(auth.role?.toString() === "PATIENT" ) {
            navigate("/patient/account") 
            console.log(rolee)
            dispatch(fetchPatientProfile(localStorage.getItem("jwt") || "")) 
            }
        else if(auth.role?.toString() === "DOCTOR"){
            navigate("/doctor/account") 
            dispatch(fetchPatientProfile(localStorage.getItem("jwt") || ""))
            console.log(rolee)
        } else {
            navigate("/admin/account")
            console.log(rolee)
        }
    }

        useEffect(()=>{
        if(auth.isLoggedIn){
           send()
        }
        },[auth.isLoggedIn])
   

  return (
    <div className=''>
        <h1 className='text-center font-bold text-2xl py-5 text-primary-color h-full'>Login As {rolee}</h1>
        <div className='space-y-5 justify-self-end'>
        <div className='space-y-3 gap-5 py-5 md:flex md:flex-auto md:justify-between sm:justify-center md:w-120 sm:w-80 lg:w-200 '>
            <TextField
                fullWidth
                name='email'
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
         
                <TextField
                    fullWidth
                    name='password'
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                

            </div>
               
   
               <div className="w-40 justify-self-end rounded-r-full rounded-l-full pt-5">
               <Button className='rounded-full' onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py:"10px"}}>
                    {auth.loading ? <CircularProgress sx={{color:"white"}}/> :"Login"}
                </Button>
               
               </div>
        <div>
        { rolee === "Patient"? <p className=" text-lime-500 justify-self-end">
                    Don't have an account?{" "}
                    <Button
                        onClick={() => setSignin("register")}
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
                </p> : ""}
                { rolee === "Patient"? <p className=" text-lime-500 justify-self-end">
                    <Button
                        onClick={() => navigate("/forgotPassword")}
                        variant="text"
                        size="small"
                        sx={{
                            textTransform: "none",
                            color: "#1976d2",
                            fontWeight: 500,
                            mt: 1,
                            "&:hover": {
                            textDecoration: "underline",
                            backgroundColor: "transparent",
                            },
                        }}
                        >
                        Forgot password?
                        </Button>

                </p> : ""}
        </div>
        </div>
        
    </div>
  )
}

export default Login