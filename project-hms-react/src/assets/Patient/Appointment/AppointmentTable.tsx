// import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../states/Store';
import {  useEffect } from 'react';
import { cancelAppointment, fetchPatientAppointments } from '../../states/PatientSlice';
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

const dispatch = useAppDispatch()
const {patient} = useAppSelector(store => store)

useEffect(()=> {
  dispatch(fetchPatientAppointments(localStorage.getItem("jwt") || ""))
},[dispatch])

const handleClick = (id:any) => {
  dispatch(cancelAppointment(id)).unwrap()
  .then(() => {
    enqueueSnackbar('Appointment Cancelled.', {
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
            <StyledTableCell align="center">Doctor</StyledTableCell>
            <StyledTableCell align="center">Specialization</StyledTableCell>
            <StyledTableCell align="center">Fees</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patient.appointments.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.docter.name}</StyledTableCell>
              <StyledTableCell align="left">{row.docter.specialization}</StyledTableCell>
              <StyledTableCell align="center">₹{row.docter.fees}</StyledTableCell>
              <StyledTableCell align="left">{row.date.toString()}</StyledTableCell>
              <StyledTableCell align="left">{row.time}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                  disabled={((row.status.toString() === "CANCELLED_BY_DOCTER") || (row.status.toString() === "CANCELLED_BY_PATIENT" || row.status.toString() === "OUTDATED" || row.status.toString() === "PRESCRIBED"))}
                  variant='contained'
                  sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#b30000' } }}
                  onClick={()=> handleClick(row.id || null)}
                >
                  Cancel
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
