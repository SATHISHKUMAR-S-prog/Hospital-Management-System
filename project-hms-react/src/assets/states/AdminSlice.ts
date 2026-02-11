import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patient } from "../Types/PatientType";
import { api } from "../Config/Api";
import { Appointment } from "../Types/AppointmentType";
import { Prescription } from "../Types/PrescriptionType";
import { Doctor } from "../Types/DoctorType";
import { Admin } from "../Types/AdminType";

interface AdminState{
    appointments:Appointment[] ,
    prescriptions:Prescription[] ,
    patients:patient[],
    docters:Doctor[],
    loading:boolean;
    error:string | null;
    message:string | null;
    admin:Admin | null
}

const initialState: AdminState ={
    appointments:[],
    prescriptions:[],
    patients:[],
    docters:[],
    loading:false,
    error:null,
    message:null,
    admin:null
}

export const fetchAllPatient = createAsyncThunk<patient[],string>("/admin/fetchAllPatient",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/admin/patients",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("all patient list error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchAllAppointments = createAsyncThunk<Appointment[],string>("/admin/fetchAllAppointments",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/admin/appointments",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("all appointmnet list error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchAllPrescription = createAsyncThunk<Prescription[],string>("/admin/fetchAllPrescription",
    async(jwt:string,{rejectWithValue}) =>{
        try {
            const response = await api.get("/api/admin/prescriptions",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("all prescription list error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchAllDoctors = createAsyncThunk<Doctor[],string>("/admin/fetchAllDoctors",
    async(jwt:string,{rejectWithValue}) => {
        try {
            const response = await api.get("/api/admin/docters",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("all doctors list error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchAdminProfile = createAsyncThunk<Admin,string>("/admin/fetchAdminProfile",
    async(jwt:string,{rejectWithValue}) => {
        try {
            const response = await api.get("/api/admin/profile",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("admin profile error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const addDoctor = createAsyncThunk<any,any>("/admin/addDoctor",
    async(docter:Doctor,{rejectWithValue}) => {
        try {
            const response = await api.post("/api/admin/addDocter", docter,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })

            // console.log(" patient login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("add doctor error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchAppointmentByDateAndStatus = createAsyncThunk<Appointment[],any>("/docter/fetchAppointmentByDateAndStatus",
    async({date,status},{rejectWithValue}) => {
        try {
            const response = await api.get(`/api/admin/appointments/${status}`,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt") || ""}`
                }, params: {date}
            })

            // console.log(response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("fetch appointment by date and stauts error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchDoctorByStatus = createAsyncThunk<Doctor[],any>("/admin/fetchDoctorByStatus",
    async(status,{rejectWithValue}) => {
        try {
            const response = await api.get(`/api/admin/status`,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                },params : {status}
            })
            const data = await response.data
            return data
        } catch (error) {
            console.log("doctor by status  error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const updateDoctorStatus = createAsyncThunk<Doctor[],any>("/admin/updateDoctorStatus",
    async({id,status},{rejectWithValue}) => {
        try {
            const response = await api.put(`/api/admin/${id}/status`,status,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                },
            })
            const data = await response.data
            return data
        } catch (error) {
            console.log("update doctor status error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const searchDoctor = createAsyncThunk<Doctor[],string>("admin/searchDoctor",
    async(query,{rejectWithValue}) => {
        try {
            const response = await api.get(`/api/admin/search/doctor`,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                },params : {query}
            })
            const data = await response.data
            return data
        } catch (error) {
            console.log("doctor by status  error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const searchPatient = createAsyncThunk<patient[],string>("admin/searchPatient",
    async(query,{rejectWithValue}) => {
        try {
            const response = await api.get(`/api/admin/search/patient`,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                },params : {query}
            })
            const data = await response.data
            return data
        } catch (error) {
            console.log("doctor by status  error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)


const AdminSlice =createSlice({
    name:"admin",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchAllPatient.fulfilled,(state,action) => {
            state.patients = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllPatient.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchAllPatient.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchAllPrescription.fulfilled,(state,action) => {
            state.prescriptions = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllPrescription.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchAllPrescription.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchAllAppointments.fulfilled,(state,action) => {
            state.appointments = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllAppointments.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchAllAppointments.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchAllDoctors.fulfilled,(state,action) => {
            state.docters = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllDoctors.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchAllDoctors.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchAdminProfile.fulfilled,(state,action) => {
            state.admin = action.payload;
            state.loading = false;
        })
        .addCase(fetchAdminProfile.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchAdminProfile.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(addDoctor.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(addDoctor.pending,(state) => {
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
        .addCase(fetchDoctorByStatus.fulfilled,(state,action) => {
            state.docters = action.payload;
            state.loading = false;
        })
        .addCase(fetchDoctorByStatus.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchDoctorByStatus.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(updateDoctorStatus.fulfilled,(state,action) => {
            state.docters = action.payload;
            state.loading = false;
        })
        .addCase(updateDoctorStatus.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(updateDoctorStatus.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(searchDoctor.fulfilled,(state,action) => {
            state.docters = action.payload;
            state.loading = false;
        })
        .addCase(searchDoctor.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(searchDoctor.pending,(state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(searchPatient.fulfilled,(state,action) => {
            state.patients = action.payload;
            state.loading = false;
        })
        .addCase(searchPatient.rejected,(state,action)=>{
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(searchPatient.pending,(state) => {
            state.loading = true;
            state.error = null
        })
    }

})

export default AdminSlice.reducer