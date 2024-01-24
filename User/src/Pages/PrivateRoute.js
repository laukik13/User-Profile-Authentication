import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../Auth/Index';
import Navbar from './Navbar';

const PrivateRoute = () => {
  
// let isLoggedIn =false;

    // if(isLoggedIn){
            
    // }else{
    //     return <Navigate to="/"/>
    // }


    return isLoggedIn()? <div><Navbar/><Outlet/></div> : <Navigate to="/" />


}

export default PrivateRoute
