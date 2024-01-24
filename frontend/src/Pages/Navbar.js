import axios from 'axios'
import React from 'react'
import { doLogout } from '../Auth/Index'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {

const token = JSON.parse(localStorage.getItem('token')) ;

const danger = (data) =>
    toast.error(data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

const hangleLogout = () => {

 axios.post(`${process.env.REACT_APP_HOST_URL}/user/logout`,{},{
    headers: {
        'Authorization': token
    }
 })
 .then((res)=>{
    console.log(res.data)
    if (!res) {
      danger("Something Went Wrong");
    }
    doLogout();
    window.location.reload();
 })
 .catch((error)=>{
   danger(error?.message);
 })

}


  return (
    <>
    <div className='navbar-wrapper'>
       <div>
        <h1>User Dashboard</h1>
       </div>
       <div>
        <button className='btn-logout' onClick={hangleLogout}>Logout</button>
        <ToastContainer />
       </div>
    </div>
    </>
  )
}

export default Navbar
