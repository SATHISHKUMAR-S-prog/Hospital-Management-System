import { Divider, ListItemIcon, ListItemText } from '@mui/material'
// import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../states/Store'
import { logout } from '../states/AuthSlice'
// import { string } from 'yup'
// import { useAppDispatch, useAppSelector } from '../State/Store'
// import { logout } from '../State/AuthSlice'
// import { sellerLogout } from '../State/Seller/SellerSlice'

interface menuItem {
    name: string,
    path: string,
    icon: any,
    activeIcon: any
} 

interface DrawerListProps  {
  menu:menuItem[],
  menu2:menuItem[],
}

const DrawerList = ({menu,menu2}:DrawerListProps) => {

const location = useLocation()
const navigate = useNavigate()
const dispatch = useAppDispatch()
const {auth} = useAppSelector(store => store)

const handleLogout = () => {
  if(auth.isLoggedIn){
    dispatch(logout(navigate))
  }
}

  return (
  <>
      <div className='h-full'>
        <div className=" h-full  w-[300px] py-5">
           
            <div className="space-y-2">
              {menu.map( (item,index) => (
                <div onClick={() => { 
                  navigate(item.path)
                   }} className='pr-9 cursor-pointer' key={index}>
                  <span className={`${item.path == location.pathname ? "bg-gradient-to-r from-blue-900 to-blue-500 text-white" : "text-cyan-900"} flex items-center px-5 py-3 `}>
                    <ListItemIcon>
                      {item.path == location.pathname ? item.activeIcon : item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </span>
                </div>
              ))}
            </div>

            <Divider />

            <div className="space-y-2">
              {menu2.map( (item,index) => (
                <div onClick={() => {
                  if(item.path == "/") handleLogout() 
                  navigate(item.path)
                }
                } className='pr-9 cursor-pointer' key={index}>
                  <span className={`${item.path == location.pathname ? "bg-gradient-to-r from-blue-900 to-blue-500 text-white" : "text-cyan-900"} flex items-center px-5 py-3 `}>
                    <ListItemIcon>
                      {item.path == location.pathname ? item.activeIcon : item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </span>
                </div>
              ))}
            </div>
           
        </div>
    </div>
  </>
  )
}

export default DrawerList