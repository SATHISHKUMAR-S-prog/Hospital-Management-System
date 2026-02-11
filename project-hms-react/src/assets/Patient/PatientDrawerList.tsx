import MedicationIcon from '@mui/icons-material/Medication';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { AccountBox, Logout } from '@mui/icons-material';
import DrawerList from '../Components/DrawerList';

export const PatientMenu1 = [
  {
    name:"Book Appointment",
    path:"/patient/newAppointment",
    icon: <BookOnlineIcon className="text-primary-color"/>,
    activeIcon: <BookOnlineIcon className="text-white" />
},
{
  name:"Appointments",
  path:"/patient/appointment",
  icon: <LibraryBooksIcon className="text-primary-color"/>,
  activeIcon: <LibraryBooksIcon className="text-white" />
},
  {
      name:"Prescription",
      path:"/patient/prescription",
      icon: <MedicationIcon className="text-primary-color"/>,
      activeIcon: <MedicationIcon className="text-white" />
  }
]

export const PatientMenu2 = [
  {
      name:"Account",
      path:"/patient/account",
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

const PatientDrawerList = () => {



  return (
 <>
  <DrawerList menu={PatientMenu1} menu2={PatientMenu2}/>
 </>
  )
}

export default PatientDrawerList