import { AccountBox, LibraryBooks, Logout, Medication } from "@mui/icons-material"
import DrawerList from "../Components/DrawerList"

export const DoctorMenu1 = [
       
  {
    name:"All Appointments",
    path:"/doctor/appointment",
    icon: <LibraryBooks className="text-primary-color"/>,
    activeIcon: <LibraryBooks className="text-white" />
},
    {
        name:"All Prescription",
        path:"/doctor/prescription",
        icon: <Medication className="text-primary-color"/>,
        activeIcon: <Medication className="text-white" />
    }
  ]

 export const DoctorMenu2 = [
    {
        name:"Account",
        path:"/doctor/account",
        icon: <AccountBox className="text-primary-color"/>,
        activeIcon: <AccountBox className="text-white" />
    },
    {
        name:"Logout",
        path: "/",
        icon: <Logout className="text-primary-color"/>,
        activeIcon: <Logout className="text-white" />
    }
]

const DoctorDrawerList = () => {

    
      return (
     <>
      <DrawerList menu={DoctorMenu1} menu2={DoctorMenu2}/>
     </>
      )
}

export default DoctorDrawerList