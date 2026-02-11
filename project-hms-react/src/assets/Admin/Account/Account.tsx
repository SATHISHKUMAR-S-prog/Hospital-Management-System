import { Divider } from "@mui/material";
import ProfileFieldCard from "../../Components/ProfileFieldCard";
import { useAppDispatch, useAppSelector } from "../../states/Store";
import { useEffect } from "react";
import { fetchAdminProfile } from "../../states/AdminSlice";



const Account = () => {
  const {admin} = useAppSelector(store => store)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchAdminProfile(localStorage.getItem("jwt") || ""))
  },[dispatch])
 
    

  return (
    <div>
          <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-600 text-2xl">Personal Details</h1>
         
        </div>
        <div>
          <ProfileFieldCard keys='Admin Name' value={admin.admin?.fullName || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Admin Email' value={admin.admin?.email || "Not Provided"} />
        </div>
      </div>
      
    </div>
  )
}

export default Account