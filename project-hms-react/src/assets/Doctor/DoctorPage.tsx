import { useEffect } from "react"
import DoctorRoute from "../Routes/DoctorRoute"
import { fetchDoctorProfile } from "../states/DoctorSlice"
import { useAppDispatch, useAppSelector } from "../states/Store"
import DoctorDrawerList from "./DoctorDrawerList"
import { Divider } from "@mui/material"


const DoctorPage = () => {

     const dispatch = useAppDispatch()
      const {docter} = useAppSelector(store => store)
        
    useEffect(()=> {
      dispatch(fetchDoctorProfile(localStorage.getItem("jwt") || ""))
    },[dispatch])

  return (

   <>
    <div>
    <h1 className="text-3xl font-bold p-5 md:p-10  text-center">Welcome {docter.docter?.name} </h1>
   </div>
   <Divider />
    <div className='lg:flex lg:h-[90vh]'>
    <section className="hidden lg:block h-full">
      <DoctorDrawerList />
    </section>

    <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
       <DoctorRoute />
    </section>
</div>
   </>
  )
}

export default DoctorPage