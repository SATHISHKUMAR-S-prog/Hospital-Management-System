// import React from 'react'

import { useEffect } from "react";
import PatientRoutes from "../Routes/PatientRoutes"
import { useAppDispatch, useAppSelector } from "../states/Store"
import PatientDrawerList from "./PatientDrawerList"
import { fetchPatientProfile } from "../states/PatientSlice";
import { Divider } from "@mui/material";

const PatientPage = () => {

  const dispatch = useAppDispatch();
  const {patient} = useAppSelector(store => store)

  useEffect(() => {
    dispatch(fetchPatientProfile(localStorage.getItem("jwt") || ""))
  },[dispatch])

  return (
  <> 
   <div>
      <h1 className="text-3xl font-bold p-5 md:p-10  text-center">Welcome {patient.patient?.fullName}</h1>
    </div>
    <Divider />
      <div className='lg:flex lg:h-[90vh]'>
      <section className="hidden lg:block h-full">
        <PatientDrawerList />
      </section>

      <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
          <PatientRoutes />
      </section>
    </div> 
</>
  )
}

export default PatientPage

