import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {

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
            
            const email = event.target.email.value;
            
            axios.post(`${process.env.REACT_APP_HOST_URL}/user/forgotPassword`,{
                email,
            })
            .then((res)=>{
                console.log(res.data); 
                if (!res) {
                  danger("Something Went Wrong");
                }
                success(res.data.message);
                navigate("/checkOtp",{
                   state:{
                    otp: res.data.data.otp,
                    resetToken: res.data.data.unHashedToken,
                    email: email
                   }
                });
            
            }).catch((error)=>{
                // console.log(error);
                  danger(error?.message);
            })
            
            }

  return (
   <>
         <section className="main-wrapper">
          <div className="fade-wrapper">
            <div className="forgot-wrapper">
                 <div className="profile-title">
                    <h1>Forgot Password</h1>
                 </div>
                 <div className="profile-img">
                    <img src="./Images/forgotPassword.png" alt="profile"/>
                 </div>
                 <div>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <div className="d-column">
                        <input type="email" placeholder="Enter your register email" name="email" />
                        </div>
                        <div className="forget-link">
                            <Link to="/">Back to Login?</Link>
                        </div>
                        <div>
                        <button type="submit" className="btn-login">Send</button>
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

export default ForgotPassword
