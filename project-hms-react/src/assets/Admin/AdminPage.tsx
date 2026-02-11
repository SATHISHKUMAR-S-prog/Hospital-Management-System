import { useEffect } from "react";
import AdminRoute from "../Routes/AdminRoute"
import { useAppDispatch, useAppSelector } from "../states/Store"
import AdminDrawerList from "./AdminDrawerList"
import { fetchAdminProfile } from "../states/AdminSlice";
import { Divider } from "@mui/material";


const AdminPage = () => {

  const dispatch = useAppDispatch();
  const {admin} = useAppSelector(store => store)

  useEffect(()=>{
    dispatch(fetchAdminProfile(localStorage.getItem("jwt") || ""))
  },[dispatch])


  return (
   <>
   <div>
    <h1 className="text-3xl font-bold p-5 md:p-10  text-center">Welcome {admin.admin?.fullName}</h1>
   </div>
   <Divider />
     <div className='lg:flex lg:h-[90vh]'>
    <section className="hidden lg:block h-full">
      <AdminDrawerList />
    </section>

    <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
       <AdminRoute />
    </section>
</div>
   </>
  )
}

export default AdminPage