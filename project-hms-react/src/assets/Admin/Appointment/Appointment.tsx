import AppointmentSearchForm from "./AppointmentSearchForm"
import AppointmentTable from "./AppointmentTable"
// import React from 'react'


const Appointment = () => {
  return (
   <div className="">
     <h1 className="mb-5 font-bold text-xl">All Appointments</h1>
     <AppointmentSearchForm />
    <AppointmentTable />
   </div>
  )
}

export default Appointment