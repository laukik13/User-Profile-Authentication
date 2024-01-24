import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResetPassword = () => {

    const location = useLocation();
    // console.log(location.state)
    const [data, setData ]=useState(location.state);

    const navigate = useNavigate();


    const success = (data) => toast.success(data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  
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

      const handleSubmit=(event)=>{
          event.preventDefault();
          
          const newPassword = event.target.newPassword.value;
          const confirmPassword = event.target.confirmPassword.value;

          if(newPassword !== confirmPassword){

            danger("Confirm Password does not Match");

          }else{

            axios.post(`${process.env.REACT_APP_HOST_URL}/user/resetPassword/`+data.resetToken,{
                newPassword,confirmPassword
              })
              .then((res)=>{
                  // console.log(res.data.data.accessToken); 
                  if (!res) {
                    danger("Something Went Wrong");
                  }
                  success(res.data.message);
                  navigate("/")
              
              }).catch((error)=>{
                  // console.log(error);
                    danger(error?.message);
              })

          }

          
          }


  return (
   <>
         <section className="main-wrapper">
        <div className="fade-wrapper">
            <div className="reset-wrapper">
                 <div className="profile-title">
                    <h1>Reset Password</h1>
                 </div>
                 <div className="profile-img">
                    <img src="./Images/changePassword.png" alt="profile"/>
                 </div>
                 <div>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <div className="d-column">
                        <input type="password" placeholder="New Password" name="newPassword" />
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" />
                        </div>
                        <div>
                        <button type="submit" className="btn-login">Reset</button>
                        <ToastContainer/>
                        </div>
                    </form>
                 </div>
            </div>
        </div>
      </section>
   </>
  )
}

export default ResetPassword
