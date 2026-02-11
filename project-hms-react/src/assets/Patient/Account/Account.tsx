import { Box, Button, Divider, Modal } from "@mui/material";
import ProfileFieldCard from "../../Components/ProfileFieldCard";
import PersonalDetails from "./PersonalDetails";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../states/Store";
import { fetchPatientProfile } from "../../states/PatientSlice";


const Account = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


  
  const {patient} = useAppSelector(store => store)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{ setOpen(true)};
    const handleClose = () => setOpen(false);

    useEffect(()=> {
        // if(auth.isLoggedIn)
           dispatch(fetchPatientProfile(localStorage.getItem("jwt") || ""))
    },[dispatch])

  return (
    <div>
          <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-600 text-2xl">Personal Details</h1>
          <div>
            <Button
              className='w-16 h-16' 
              onClick={() => handleOpen()}
              variant='contained'
              size='small'
              sx={{borderRadius:"2.9rem"}}> 
              <Edit />
            </Button>
          </div>
        </div>
        <div>
          <ProfileFieldCard keys='Patient Name' value={ patient.patient?.fullName || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Patient Email' value={patient.patient?.email || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Mobile' value={patient.patient?.contact || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Gender' value={patient.patient?.gender.toString() || "Not Provided"} />

        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PersonalDetails />
        </Box>
      </Modal>
    </div>
  )
}

export default Account