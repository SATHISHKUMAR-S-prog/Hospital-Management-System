import { Divider } from "@mui/material";
import ProfileFieldCard from "../../Components/ProfileFieldCard";
import { useAppDispatch, useAppSelector } from "../../states/Store";
import { useEffect } from "react";
import { fetchDoctorProfile } from "../../states/DoctorSlice";



const Account = () => {

  const dispatch = useAppDispatch()
  const {docter} = useAppSelector(store => store)
    
useEffect(()=> {
  dispatch(fetchDoctorProfile(localStorage.getItem("jwt") || ""))
},[dispatch])


  return (
    <div>
          <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-600 text-2xl">Personal Details</h1>
         
        </div>
        <div>
          <ProfileFieldCard keys='Doctor Name' value={docter.docter?.name ||  "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Doctor Email' value={ docter.docter?.email || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Mobile' value={docter.docter?.mobileNo ||"Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Specialization' value={docter.docter?.specialization.toString() ||"Not Provided"} />
        </div>
      </div>
      
    </div>
  )
}

export default Account