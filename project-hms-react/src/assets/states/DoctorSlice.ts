import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Config/Api";
import { Appointment} from "../Types/AppointmentType";
import { Prescription } from "../Types/PrescriptionType";
import { Doctor } from "../Types/DoctorType";



interface patientState{
    appointments:Appointment[] ,
    prescriptions:Prescription[] ,
    loading:boolean;
    error:string | null;
    message:string | null;
    docter:Doctor | null 
}

const initialState: patientState ={
    appointments:[],
    prescriptions:[],
    loading:false,
    error:null,
    message:null,
    docter:null
}



export const fetchDocterAppointments = createAsyncThunk<Appointment[],string>("/docter/fetchDocterAppointments",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/docter/appointments",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("doctor appointment list error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchDocterPrescription = createAsyncThunk<Prescription[],string>("/docter/fetchDocterPrescription",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/docter/prescriptions",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("doctor prescription list error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchDoctorProfile = createAsyncThunk<Doctor,string>("/docter/fetchDoctorProfile",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/docter/profile",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("doctor profile error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const addPrescription = createAsyncThunk<any,any>("/docter/addPrescription",
    async({id,prescription},{rejectWithValue}) => {
        try {
            const response = await api.post(`/api/docter/${id}/addPrescription`, prescription,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("add prescription error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const updateAppointment = createAsyncThunk<Appointment[],Appointment>("/docter/updateAppointment",
    async(appointment:Appointment,{rejectWithValue}) => {
        try {
            const response = await api.put(`/api/docter/update/appointment`,appointment,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt") || ""}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("update appointment  error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const cancelAppointment = createAsyncThunk<Appointment[],number>("/docter/cancelAppointment",
    async(id:number,{rejectWithValue}) => {
        try {
            const response = await api.put(`/api/docter/${id}/cancel`,"",{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt") || ""}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("cancel appointment  error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchAppointmentByDateAndStatus = createAsyncThunk<Appointment[],any>("/docter/fetchAppointmentByDateAndStatus",
    async({date,status},{rejectWithValue}) => {
        try {
            const response = await api.get(`/api/docter/appointments/${status}`,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt") || ""}`
                }, params: {date}
            })

            console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("user profile error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const searchAppointments = createAsyncThunk<Appointment[],string>("/docter/searchAppointments",
    async(query,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/docter/search/appointment",{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                },
                params:{query}
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("doctor appointment list error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

const DocterSlice =createSlice({
    name:"docter",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchDocterPrescription.fulfilled,(state,action) => {
            state.prescriptions = action.payload;
            state.loading = false;
        })
        .addCase(fetchDocterPrescription.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchDocterPrescription.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchDocterAppointments.fulfilled,(state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        })
        .addCase(fetchDocterAppointments.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchDocterAppointments.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchDoctorProfile.fulfilled,(state,action) => {
            state.docter = action.payload;
            state.loading = false;
        })
        .addCase(fetchDoctorProfile.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchDoctorProfile.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(addPrescription.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(addPrescription.pending,(state) => {
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
        .addCase(fetchAppointmentByDateAndStatus.fulfilled,(state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        })
        .addCase(fetchAppointmentByDateAndStatus.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchAppointmentByDateAndStatus.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(searchAppointments.fulfilled,(state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        })
        .addCase(searchAppointments.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(searchAppointments.pending,(state) => {
            state.loading = true;
            state.error = null
        })
    }

})

export default DocterSlice.reducer