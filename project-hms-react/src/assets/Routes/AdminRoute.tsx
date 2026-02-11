import { Route, Routes } from "react-router-dom"
import AllDoctors from "../Admin/AllDoctors/AllDoctors"
import Prescription from "../Admin/Prescription/Prescription"
import Appointment from "../Admin/Appointment/Appointment"
import Account from "../Admin/Account/Account"
import AddDoctor from "../Admin/AllDoctors/AddDoctor"
import Allpatients from "../Admin/AllPatients/AllPatients"


const AdminRoute = () => {
  return (
    <div>

        <Routes>

            <Route path="patientlist" element={<Allpatients />} />
            <Route path="doctorlist" element={<AllDoctors />} />
            <Route path="prescription" element={<Prescription />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="account" element={<Account />} />
            <Route path="addDoctor" element={<AddDoctor />} />

        </Routes>
    </div>
  )
}

export default AdminRoute