import { AccountBox, LibraryBooks, Logout, Medication } from "@mui/icons-material"
import DrawerList from "../Components/DrawerList"
import Groups2Icon from '@mui/icons-material/Groups2';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export const AdminMenu1 = [
  {
    name:"All Patients",
    path:"/admin/patientlist",
    icon: <Groups2Icon className="text-primary-color"/>,
    activeIcon: <Groups2Icon className="text-white" />
}, {
  name:"All Doctors",
  path:"/admin/doctorlist",
  icon: <GroupsIcon className="text-primary-color"/>,
  activeIcon: <GroupsIcon className="text-white" />
},
  {
    name:"Appointments Details",
    path:"/admin/appointment",
    icon: <LibraryBooks className="text-primary-color"/>,
    activeIcon: <LibraryBooks className="text-white" />
},
    {
        name:"Prescription list",
        path:"/admin/prescription",
        icon: <Medication className="text-primary-color"/>,
        activeIcon: <Medication className="text-white" />
    }, {
      name:"Add Doctors",
      path:"/admin/addDoctor",
      icon: <PersonAddAlt1Icon className="text-primary-color"/>,
      activeIcon: <PersonAddAlt1Icon className="text-white" />
  }
  ]

 export const AdminMenu2 = [
    {
        name:"Account",
        path:"/admin/account",
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

const AdminDrawerList = () => {

    
      return (
     <>
      <DrawerList menu={AdminMenu1} menu2={AdminMenu2}/>
     </>
      )
}

export default AdminDrawerList