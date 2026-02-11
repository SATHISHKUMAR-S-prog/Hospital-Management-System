import { Outlet, Route, Routes } from "react-router-dom"
import Prescription from "../Patient/Prescription/Prescription"
import Appointment from "../Patient/Appointment/Appointment"
// import BookAppointment from "../Patient/BookAppointment/BookAppointment"
import Account from "../Patient/Account/Account"
import BookAppointmentPage from "../Patient/BookAppointment/BookAppointmentPage"


const PatientRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Outlet />}>
      <Route path="prescription" element={<Prescription />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path="newAppointment" element={<BookAppointmentPage />} />
      <Route path="account" element={<Account />} />
    </Route>
  </Routes>
  )
}

export default PatientRoutes