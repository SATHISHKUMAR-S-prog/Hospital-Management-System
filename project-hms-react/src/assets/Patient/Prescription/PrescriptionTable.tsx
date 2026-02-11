
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
import { fetchPatientPrescription } from '../../states/PatientSlice';

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
  const {patient} = useAppSelector(store => store)
  
  useEffect(()=> {
    dispatch(fetchPatientPrescription(localStorage.getItem("jwt") || ""))
  },[dispatch])


    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>SI.No</StyledTableCell>
                <StyledTableCell align="center">Doctor</StyledTableCell>
                <StyledTableCell align="center">Specialization</StyledTableCell>
                <StyledTableCell align="center">Disseas</StyledTableCell>
                <StyledTableCell align="center">Causes/Alergis</StyledTableCell>
                <StyledTableCell align="center">Prescripe</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patient.prescriptions.map((row,index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.docter.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.docter.specialization}</StyledTableCell>
                  <StyledTableCell align="left">{row.disease}</StyledTableCell>
                  <StyledTableCell align="left">{row.cause}</StyledTableCell>
                
                  <StyledTableCell align="left">{row.prescripe}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default PrescriptionTable;