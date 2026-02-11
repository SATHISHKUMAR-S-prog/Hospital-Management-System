import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patient } from "../Types/PatientType";
import { api } from "../Config/Api";
import { Appointment } from "../Types/AppointmentType";
import { Prescription } from "../Types/PrescriptionType";
import { Doctor, Specialization } from "../Types/DoctorType";

interface patientState{
    appointments:Appointment[] ,
    prescriptions:Prescription[] ,
    patient:patient | null,
    loading:boolean;
    error:string | null;
    message:string | null,
    docters:Doctor[]
}

const initialState: patientState ={
    appointments:[],
    prescriptions:[],
    patient:null,
    loading:false,
    error:null,
    message:null,
    docters:[]
}

export const fetchPatientProfile = createAsyncThunk<patient,string>("/patient/fetchPatientProfile",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/patient",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("patient profile error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchPatientAppointments = createAsyncThunk<Appointment[],string>("/patient/fetchPatientAppointments",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/patient/appointments",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("patient appointment list error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchPatientPrescription = createAsyncThunk<Prescription[],string>("/patient/fetchPatientPrescription",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/patient/prescriptions",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("patient prescription list  error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchDoctorBySpecialist = createAsyncThunk<Doctor[],Specialization>("/patient/fetchDoctorBySpecialist",
    async(specialization,{rejectWithValue}) =>{
      
        try {
            const response = await api.get(`/api/patient/docters/${specialization}`,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt") || ""}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("doctor by specialist error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const bookAppointment = createAsyncThunk<any,any>("/patient/bookAppointment",
    async(appointment:any,{rejectWithValue}) => {
        try {
            const response = await api.post(`/api/patient/create/appointment`,appointment,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt") || ""}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("book appointmnet  error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const updateAppointment = createAsyncThunk<Appointment[],Appointment>("/patient/updateAppointment",
    async(appointment:Appointment,{rejectWithValue}) => {
        try {
            const response = await api.put(`/api/patient/update/appointment`,appointment,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt") || ""}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("update appointment error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const cancelAppointment = createAsyncThunk<Appointment[],number>("/patient/cancelAppointment",
    async(id:number,{rejectWithValue}) => {
        try {
            const response = await api.put(`/api/patient/${id}/cancel`,"",{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt") || ""}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("cancel appointmnet error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

const PatientSlice =createSlice({
    name:"patient",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchPatientProfile.fulfilled,(state,action) => {
            state.patient = action.payload;
            state.loading = false;
        })
        .addCase(fetchPatientProfile.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchPatientProfile.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchPatientPrescription.fulfilled,(state,action) => {
            state.prescriptions = action.payload;
            state.loading = false;
        })
        .addCase(fetchPatientPrescription.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchPatientPrescription.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchPatientAppointments.fulfilled,(state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        })
        .addCase(fetchPatientAppointments.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchPatientAppointments.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchDoctorBySpecialist.fulfilled,(state,action) => {
            state.docters = action.payload;
            state.loading = false;
        })
        .addCase(fetchDoctorBySpecialist.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchDoctorBySpecialist.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(bookAppointment.fulfilled,(state,action) => {
            state.message = action.payload;
            state.loading = false;
        })
        .addCase(bookAppointment.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(bookAppointment.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(updateAppointment.fulfilled,(state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        })
        .addCase(updateAppointment.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(updateAppointment.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(cancelAppointment.fulfilled,(state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        })
        .addCase(cancelAppointment.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(cancelAppointment.pending,(state) => {
            state.loading = true;
            state.error = null
        })
    }

})

export default PatientSlice.reducer