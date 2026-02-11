import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box, Divider, Drawer, IconButton, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../states/Store';
import { logout } from '../states/AuthSlice';
import { PatientMenu1, PatientMenu2 } from '../Patient/PatientDrawerList';
import { AdminMenu1, AdminMenu2 } from '../Admin/AdminDrawerList';
import { DoctorMenu1, DoctorMenu2 } from '../Doctor/DoctorDrawerList';
import SearchForm from '../Doctor/Appointment/SearchForm';

const NavBar = () => {
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const { auth } = useAppSelector(store => store);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    console.log(menu1)
    console.log(menu2)
    console.log(auth.role)
  };

  const handleLogout = () => {
    if (auth.isLoggedIn) {
      dispatch(logout(navigate));
    }
  };

  const menu1 = auth.role?.toString() === "PATIENT" ? PatientMenu1 :
                auth.role?.toString() === "ADMIN" ? AdminMenu1 :
                auth.role?.toString() === "DOCTOR" ? DoctorMenu1 : [];

  const menu2 = auth.role?.toString() === "PATIENT" ? PatientMenu2 :
                auth.role?.toString() === "ADMIN" ? AdminMenu2 :
                auth.role?.toString() === "DOCTOR" ? DoctorMenu2 : [];

                const DrawerList = (
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <List>
                      {menu1.map((text, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton onClick={() => navigate(text.path)}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                    <Divider />
                    <List>
                      {menu2.map((text, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton onClick={() => {
                            if (text.path === "/") handleLogout();
                            else navigate(text.path);
                          }}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                );
              

  return (
    <>
      <Box
        sx={{ zIndex: 2 }}
        className="sticky top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-white text-white"
      >
       <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b relative">
  <div className="flex items-center gap-4">
    {!isLarge && (
      <IconButton onClick={toggleDrawer(true)} className="text-white z-10">
        <MenuIcon />
      </IconButton>
    )}
    <div
      onClick={() => navigate("/")}
      className="cursor-pointer flex items-center"
    >
      <img
        src="https://w7.pngwing.com/pngs/957/974/png-transparent-hospital-logo-clinic-health-care-physician-business-thumbnail.png"
        alt="Hospital Logo"
        className="w-10 h-10"
      />
      <span className="pl-2 font-semibold text-base sm:text-lg text-white">
        HOSPITAL MANAGEMENT SYSTEM
      </span>
    </div>
  </div>

  {/* Centered SearchForm */}
  <div className="hidden md:flex justify-center flex-1">
  {["/doctor/appointment", "/admin/doctorlist", "/admin/patientlist"].includes(location.pathname) ? <SearchForm /> : ""}

  </div>
</div>
      </Box>
      
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default NavBar;
