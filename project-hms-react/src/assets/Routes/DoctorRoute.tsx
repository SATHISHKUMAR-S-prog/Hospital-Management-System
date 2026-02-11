import { Route, Routes } from "react-router-dom"
import Prescription from "../Doctor/Prescription/Prescription"
import Appointment from "../Doctor/Appointment/Appointment"
import Account from "../Doctor/Account/Account"


const DoctorRoute = () => {
  return (
    <div>

        <Routes>

            <Route path="prescription" element={<Prescription />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="account" element={<Account />} />
        </Routes>
    </div>
  )
}

export default DoctorRoute