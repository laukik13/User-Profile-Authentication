import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doLogin } from "../Auth/Index";


const LoginPage = () => {

  // const [data,setData] = useState([]);

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
const password = event.target.password.value;

axios.post(`${process.env.REACT_APP_HOST_URL}/user/login`,{
    email,
    password
})
.then((res)=>{
    // console.log(res.data.data.accessToken); 
    if (!res) {
      danger("Something Went Wrong");
    }
    doLogin(res.data.data.accessToken)
    success(res.data.message);
    navigate("/user/dashboard")

}).catch((error)=>{
    // console.log(error);
      danger(error?.message);
})

}


  return (
    <>
      <section className="main-wrapper">
        <div className="fade-wrapper">
            <div className="login-wrapper">
                 <div className="profile-title">
                    <h1>Sign In</h1>
                 </div>
                 <div className="profile-img">
                    <img src="./Images/profile2.png" alt="profile"/>
                 </div>
                 <div>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <div className="d-column">
                        <input type="email" placeholder="Email" name="email" />
                        <input type="password" placeholder="Password" name="password" />
                        </div>
                        <div className="forget-link">
                            <Link to="/forgotPassword">Forget Password?</Link>
                        </div>
                        <div>
                        <button type="submit" className="btn-login">Login</button>
                        <ToastContainer/>
                        </div>
                    </form>
                 </div>
                 <div className="account-link">
                    <Link to="/register">Create a New Account</Link>
                         <div><h4>(or)</h4></div>
                    <div className="d-row">
                    <Link ><BsFacebook className="fb" /></Link>
                    <Link><AiFillTwitterCircle className="ai" /></Link>
                    <Link><AiFillGoogleCircle className="ai" /></Link>
                    </div>
                 </div>

            </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
