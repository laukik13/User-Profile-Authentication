import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {

  const [baseImg, setBaseImg] = useState();

  const [imgData, setImgData] = useState();


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

  const handleImageChange = async (e) => {
    // if(e.target.files){

    // console.log(e.target.files);
    setImgData(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    // console.log(base64);
    setBaseImg(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      danger("Password dose not match");
    }

    const formData = new FormData();

    formData.append("avatar", imgData);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);


    axios
      .post(`${process.env.REACT_APP_HOST_URL}/user/register`,formData)
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

  return (
    <>
      <section className="main-wrapper">
        <div className="fade-wrapper">
          <div className="signup-wrapper">
            <div className="profile-title">
              <h1>Sign Up</h1>
            </div>
            <div>
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="signup-profile-img">
                  <img src={baseImg} className="profileImg" />
                  <label className="upload-lable">Click and Upload</label>
                  <input
                    type="file"
                    placeholder=""
                    name="avatar"
                    onChange={handleImageChange}
                    className="input-file"
                  />
                 
                  
                </div>
                <div className="d-column">
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    className="input-box"
                  />
                  <input type="text" placeholder="Last name" name="lastName" className="input-box"/>

                  <input type="email" placeholder="Email" name="email" className="input-box" />

                  <input
                    type="tel"
                    placeholder="Please enter a phone number"
                    name="phone"
                    className="input-box"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
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
                    Sign Up
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
            <div className="signup-link">
              <Link to="/">Already SignIn?</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
