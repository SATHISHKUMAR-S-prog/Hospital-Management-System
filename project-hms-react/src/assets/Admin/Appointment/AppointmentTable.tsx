// import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../states/Store';
import { fetchAllAppointments } from '../../states/AdminSlice';

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
  const {admin} = useAppSelector(store => store )

  useEffect(() => {
      dispatch(fetchAllAppointments(localStorage.getItem("jwt") || ""))
  },[dispatch])


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
            <StyledTableCell align="center">Doctor Name</StyledTableCell>
            <StyledTableCell align="center">Fees</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {admin.appointments.map((row,index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
              {index+1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.patient.fullName}</StyledTableCell>
              <StyledTableCell align="left">{row.patient.gender}</StyledTableCell>
              <StyledTableCell align="left">{row.patient.email}</StyledTableCell>
              <StyledTableCell align="center">{row.patient.contact}</StyledTableCell>
              <StyledTableCell align="left">{row.docter.name}</StyledTableCell>
              <StyledTableCell align="center">₹{row.docter.fees}</StyledTableCell>
              <StyledTableCell align="left">{row.date.toString()}</StyledTableCell>
              <StyledTableCell align="left">{row.time}</StyledTableCell>
              <StyledTableCell align="center">
              
                 {row.status}
               
              </StyledTableCell>
            </StyledTableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
