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
import { useEffect, useState } from 'react';
import { fetchAllDoctors, updateDoctorStatus } from '../../states/AdminSlice';
import { Button, Menu, MenuItem } from '@mui/material';
import { doctorStatusList } from './SearchDoctorByStatusForm';
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


export default function DoctorsTable() {

    const dispatch = useAppDispatch()
    const {admin} = useAppSelector(store => store )

    useEffect(() => {
        dispatch(fetchAllDoctors(localStorage.getItem("jwt") || ""))
    },[dispatch])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, doctorId: number) => {
      setAnchorEl(event.currentTarget);
      setSelectedDoctorId(doctorId);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
      setSelectedDoctorId(null);
    };

    const handleUpdateStatus =(id:number,accStatus:any) => {
      dispatch(updateDoctorStatus({id:id,status:accStatus})).unwrap()
      .then(() => {
        enqueueSnackbar('Status changed.', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
            });
        })
        .catch (() => {
            enqueueSnackbar('Something went wrong..', {
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
            <StyledTableCell align="center">Doctor Name</StyledTableCell>
            <StyledTableCell align="center">Specialization</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Mobile No.</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Fees</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admin.docters.map((row,index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.specialization}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.mobileNo}</StyledTableCell>
              <StyledTableCell align="left">{row.username}</StyledTableCell>
              <StyledTableCell align="left">{row.fees}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                id={`status-button-${row.id}`}
                onClick={(e) => handleClick(e, row.id || 0)}
              >
                {row.status}
              </Button>
              <Menu
                id={`status-menu-${row.id}`}
                anchorEl={anchorEl}
                open={selectedDoctorId === row.id}
                onClose={handleClose}
                aria-labelledby={`status-button-${row.id}`}
              >
                {doctorStatusList.map((AccStatus) => (
                  <MenuItem
                    key={AccStatus.value}
                    disabled={AccStatus.name === 'ALL'}
                    onClick={() => {
                      handleUpdateStatus(row.id || 0, AccStatus.value);
                      handleClose(); // close the menu after status update
                    }}
                  >
                    {AccStatus.name}
                  </MenuItem>
                ))}
              </Menu>

              </StyledTableCell>
            </StyledTableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
