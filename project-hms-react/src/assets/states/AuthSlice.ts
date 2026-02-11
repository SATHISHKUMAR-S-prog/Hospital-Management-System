import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../Config/Api";
import { patient, USER_ROLE } from "../Types/PatientType";

interface AuthState{
    isLoggedIn: boolean;
    jwt:string | null;
    loading:boolean;
    error:string | null;
    message:string | null;
    role:USER_ROLE | null
}

const initialState:AuthState={
    isLoggedIn: false,
    jwt:null,
    loading:false,
    error:null,
    message:null,
    role: null
}

export const login = createAsyncThunk<any,any>("/auth/login", 
    async(loginRequest:{email : string,password:string,role:USER_ROLE}, {rejectWithValue}) => {
        try {
            const response = await api.post("/login",loginRequest)

            console.log("login ---  ",response)
            const data = await response.data
            
            localStorage.setItem("jwt",data.jwt)
            // console.log("data", data)
            return data
        } catch (error:any) {
            console.log("user sign in error - - - " , error)
            return rejectWithValue(error.response.data); 
        }
    }
)

export const createPatient = createAsyncThunk<any,any>("/auth/createPatient",
    async(patient:patient, {rejectWithValue}) => {
        try {
            const response = await api.post("/create/patient",patient)

            // console.log("login ---  ",response.data)
            const data = await response.data
            
            localStorage.setItem("jwt",data.jwt)
            return data
        } catch (error:any) {
            console.log("create patient error - - - " , error)
            return rejectWithValue(error.response.data); 
        }
    }
)

export const logout = createAsyncThunk<any,any>(
    "/auth/logout",
    async (navigate, { rejectWithValue }) => {
      try {
        localStorage.clear(); 
        // console.log("Logout success", localStorage);
        navigate("/");
      } catch (error) {
        console.log("Logout error: ", error);
        return rejectWithValue(error); 
      }
    }
  );

  export const sendEmail = createAsyncThunk<any,any>("/auth/sendEmail",
    async({email},{rejectWithValue}) => {
        try {
            const response = await api.get(`/forgotPassword`,{
                params:{ email}
            })
            return response.data.message
        } catch (error) {
            return rejectWithValue(error);
        }
    }
  )

  export const resetPassword = createAsyncThunk<any,any>("/auth/resetPassword",
    async(loginRequest:{email : string,password:string,role:USER_ROLE}, {rejectWithValue}) => {
        try {
            const response = await api.put("/resetPassword",loginRequest)
            console.log(response.data.message)
            return response.data.message
        } catch (error:any) {
            console.log("user sign in error - - - " , error)
            return rejectWithValue(error.response.data); 
        }
    }
  )

const AuthSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(login.fulfilled,(state,action) => {
            state.jwt = action.payload.jwt
            state.role = action.payload.role
            // console.log(state.role)
            if(action.payload){
                state.isLoggedIn = true
            }
            state.loading=false
        })
        .addCase(createPatient.fulfilled,(state,action)=>{
            state.jwt = action.payload.jwt
            state.role = action.payload.role
            if(action.payload){
                state.isLoggedIn = true
            }
            state.loading=false
        })
        .addCase(login.pending,(state) => {
            state.loading = true
            state.error = null;
            state.isLoggedIn = false
        })
        .addCase(login.rejected,(state,action) => {
            state.error = action.payload as string
            state.loading = false
            state.isLoggedIn = false
        })
        .addCase(createPatient.pending,(state)=>{
            state.loading = true
            state.isLoggedIn = false
            state.error = null
        })
        .addCase(createPatient.rejected,(state,action)=>{
            state.error = action.payload as string
            state.isLoggedIn = false
            state.loading = false
        })
        .addCase(logout.fulfilled,(state) => {
            state.jwt = null,
            state.error = null,
            state.role = null,
            state.isLoggedIn = false,
            state.loading = false,
            state.message = null
        })
        .addCase(sendEmail.fulfilled,(state,action)=>{
            state.message = action.payload
            state.isLoggedIn = false
            state.loading=false
        })
        .addCase(sendEmail.pending,(state) => {
            state.loading = true
            state.error = null;
            state.isLoggedIn = false
        })
        .addCase(sendEmail.rejected,(state,action) => {
            state.error = action.payload as string
            state.loading = false
            state.isLoggedIn = false
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.message = action.payload
            state.isLoggedIn = false
            state.loading=false
        })
        .addCase(resetPassword.pending,(state) => {
            state.loading = true
            state.error = null;
            state.isLoggedIn = false
        })
        .addCase(resetPassword.rejected,(state,action) => {
            state.error = action.payload as string
            state.loading = false
            state.isLoggedIn = false
        })
    }

})

export default AuthSlice.reducer;