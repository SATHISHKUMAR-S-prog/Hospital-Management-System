// import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
// import HomePage from './assets/Home/HomePage'
// import Appointment from './assets/Patient/Appointment/Appointment'
// import PatientDrawerList from './assets/Patient/PatientDrawerList'
import HomePage from './assets/Home/HomePage'
import PatientPage from './assets/Patient/PatientPage'
// import BookAppointment from './assets/Patient/BookAppointment/BookAppointment'
// import LoadingPage from './assets/Components/LoadingPage'
import DoctorPage from './assets/Doctor/DoctorPage'
import AdminPage from './assets/Admin/AdminPage'
import NavBar from './assets/Home/NavBar'
import ForgotPassword from './assets/Home/forgotPassword'
import ResetPassword from './assets/Home/ResetPassword'

function App() {
const location = useLocation()

  return (
    <>
      {(location.pathname !== "/") ? <NavBar /> : ""}
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/patient/*' element={<PatientPage />} />
        <Route path='/doctor/*' element={<DoctorPage />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
