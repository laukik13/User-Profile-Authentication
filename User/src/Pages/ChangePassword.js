import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const [data, setData] = useState([]);

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

    const oldPassword = event.target.oldPassword.value;
    const newPassword = event.target.newPassword.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      danger("Confirm Password dose not match");
    }

    axios.post(
        `${process.env.REACT_APP_HOST_URL}/user/changePassword`,
        {
          oldPassword,
          newPassword,
          confirmPassword
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (!res) {
          danger("Something Went Wrong");
        }

        success(res.data.message);
        event.target.reset();
      })
      .catch((error) => {
        danger(error?.message);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/user/getCurrentUser`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        //  console.log(res.data.data)
        setData(res.data.data);
      })
      .catch((error) => {
        danger(error?.message);
      });
  }, []);

  return (
    <>
      <section className="main-wrapper">
        <div className="fade-wrapper">
          <div className="changePassword-wrapper">
            <div className="profile-title">
              <h1>Change Password</h1>
            </div>
            <div>
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="changePassword-img"></div>
                <div className="d-column">
                  <div className="input-group">
                    <label>User ID :</label>
                    <p>{data.email}</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Old Password"
                    name="oldPassword"
                    className="input-box"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    name="newPassword"
                    className="input-box"
                  />

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className="input-box"
                  />
                </div>
                <div>
                  <button type="submit" className="btn-login">
                    Change Password
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
            <div className="signup-link">
              <Link to="/user/dashboard">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
