import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckOtp = () => {
  const location = useLocation();

  const [data, setData] = useState(location.state);

  const navigate = useNavigate();

  const success = (data) =>
    toast.success(data, {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const otpInput = event.target.otp.value;

    if (otpInput != data.otp) {
      danger("OTP does not Match");
    } else {
      navigate("/resetPassword", {
        state: {
          resetToken: data.resetToken,
        },
      });
    }
  };

  return (
    <>
      <section className="main-wrapper">
        <div className="fade-wrapper">
          <div className="checkotp-wrapper">
            <div className="profile-title">
              <h1>Check OTP</h1>
            </div>
            <div className="profile-img">
              <img src="./Images/forgotPassword.png" alt="profile" />
            </div>
            <div>
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="d-column">
                  <div className="input-group">
                    <label>User ID :</label>
                    <p>{data.email}</p>
                  </div>
                  <input type="text" placeholder="Enter your OTP" name="otp" />
                </div>
                <div className="forget-link">
                  <Link to="/">Resend OTP?</Link>
                </div>
                <div>
                  <button type="submit" className="btn-login">
                    Check
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOtp;
