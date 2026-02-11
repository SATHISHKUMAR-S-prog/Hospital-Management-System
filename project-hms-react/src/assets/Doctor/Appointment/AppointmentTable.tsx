// import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../states/Store';
import { useEffect, useState } from 'react';
import { cancelAppointment, fetchDocterAppointments } from '../../states/DoctorSlice';
import AddPrescrition from '../Prescription/AddPrescription';
import { enqueueSnackbar } from 'notistack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function AppointmentTable() {

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
    
            const [open, setOpen] = useState(false);
            const [app,setApp] = useState(null)
              const handleOpen = () =>{ setOpen(true)};
              const handleClose = () => setOpen(false);

 const dispatch = useAppDispatch()
  const {docter} = useAppSelector(store => store)
    
useEffect(()=> {
  dispatch(fetchDocterAppointments(localStorage.getItem("jwt") || ""))
},[dispatch])

const handleClick = (appointment:any) => {
  setApp(appointment)
  handleOpen()
}

const handleClick1 = (id:any) => {
  dispatch(cancelAppointment(id)).unwrap()
  .then(() => {
    enqueueSnackbar('Appointment cancelled.', {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
  });
  })
  .catch(() => {
    enqueueSnackbar('Something went wrong.', {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
  });
  })
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SI.No</StyledTableCell>
            <StyledTableCell align="center">Patient Name</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell align="center">Prescribe</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docter.appointments.map((row,index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.patient.fullName}</StyledTableCell>
              <StyledTableCell align="left">{row.patient.gender.toString()}</StyledTableCell>
              <StyledTableCell align="left">{row.patient.email}</StyledTableCell>
              <StyledTableCell align="center">{row.patient.contact}</StyledTableCell>
              <StyledTableCell align="left">{row.date.toString()}</StyledTableCell>
              <StyledTableCell align="left">{row.time}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                  disabled={((row.status.toString() === "CANCELLED_BY_DOCTER") || (row.status.toString() === "CANCELLED_BY_PATIENT" || row.status.toString() === "OUTDATED" || row.status.toString() === "PRESCRIBED"))}
                  variant='contained'
                  sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#b30000' } }}
                  onClick={()=> handleClick1(row.id)}
                >
                CANCEL
                </Button>
              </StyledTableCell>
             
              <StyledTableCell align="center">
              <Button 
                variant='contained'
                sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: '#006400' } }}
                disabled={!(row.status.toString() === "ACTIVE")}
                  onClick={()=> handleClick(row)}
                >
                 Prescribe
                </Button>
              </StyledTableCell>
            </StyledTableRow>

          
            
          ))}
        </TableBody>
      </Table>

      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                  <AddPrescrition appointment={app} />
            </Box>
            </Modal>
    </TableContainer>
  );
}
