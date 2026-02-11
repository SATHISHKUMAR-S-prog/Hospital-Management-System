
// import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../states/Store';
import { useEffect } from 'react';
import { fetchAllPrescription } from '../../states/AdminSlice';

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


const PrescriptionTable = () => {

   const dispatch = useAppDispatch()
    const {admin} = useAppSelector(store => store )
  
    useEffect(() => {
        dispatch(fetchAllPrescription(localStorage.getItem("jwt") || ""))
    },[dispatch])


    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>SI.No</StyledTableCell>
                <StyledTableCell align="right">Doctor NAme</StyledTableCell>
                <StyledTableCell align="right">Patient NAme</StyledTableCell>
                <StyledTableCell align="right">Appointment Date</StyledTableCell>
                <StyledTableCell align="right">Appointment Time</StyledTableCell>
                <StyledTableCell align="right">Disseas</StyledTableCell>
                <StyledTableCell align="right">Causes/Alergis</StyledTableCell>
                <StyledTableCell align="center">Prescripe</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admin.prescriptions.map((row,index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                  {index+1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.docter.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.patient.fullName}</StyledTableCell>
                  <StyledTableCell align="right">{row.date.toString()}</StyledTableCell>
                  <StyledTableCell align="right">{row.time}</StyledTableCell>
                  <StyledTableCell align="right">{row.disease}</StyledTableCell>
                  <StyledTableCell align="right">{row.cause}</StyledTableCell>
                  <StyledTableCell align="right">{row.prescripe}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default PrescriptionTable;