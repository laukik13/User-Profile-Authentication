import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const input4 = document.getElementById("input4");
const input5 = document.getElementById("input5");
const input6 = document.getElementById("input6");
const input7 = document.getElementById("input7");
const input8 = document.getElementById("input8");


const editInputFunc1 = () => {
  document.getElementById("edit-icon1").style.display = "block";
};

const editInputFunc2 = () => {
  document.getElementById("edit-icon2").style.display = "block";
};

const editInputFunc3 = () => {
  document.getElementById("edit-icon3").style.display = "block";
};

const editInputFunc4 = () => {
  document.getElementById("edit-icon4").style.display = "block";
};

const editInputFunc5 = () => {
  document.getElementById("edit-icon5").style.display = "block";
};

const editInputFunc6 = () => {
  document.getElementById("edit-icon6").style.display = "block";
};

const editInputFunc7 = () => {
  document.getElementById("edit-icon7").style.display = "block";
};

const editInputFunc8 = () => {
  document.getElementById("edit-icon8").style.display = "block";
};

const exitInputFunc1 = () => {
  document.getElementById("edit-icon1").style.display = "none";
};

const exitInputFunc2 = () => {
  document.getElementById("edit-icon2").style.display = "none";
};

const exitInputFunc3 = () => {
  document.getElementById("edit-icon3").style.display = "none";
};

const exitInputFunc4 = () => {
  document.getElementById("edit-icon4").style.display = "none";
};

const exitInputFunc5 = () => {
  document.getElementById("edit-icon5").style.display = "none";
};
const exitInputFunc6 = () => {
  document.getElementById("edit-icon6").style.display = "none";
};

const exitInputFunc7 = () => {
  document.getElementById("edit-icon7").style.display = "none";
};
const exitInputFunc8 = () => {
  document.getElementById("edit-icon8").style.display = "none";
};

if (input1) {
  input1.addEventListener("click", function () {
    // input.disabled="false"

    document.getElementById("edit-icon1").style.display = "none";
  });
}
if (input2) {
  input2.addEventListener("click", function () {
    // input.disabled="false"

    document.getElementById("edit-icon2").style.display = "none";
  });
}
if (input3) {
  input3.addEventListener("click", function () {
    // input.disabled="false"

    document.getElementById("edit-icon3").style.display = "none";
  });
}
if (input4) {
  input4.addEventListener("click", function () {
    // input.disabled="false"

    document.getElementById("edit-icon4").style.display = "none";
  });
}
if (input5) {
  input5.addEventListener("click", function () {
    // input.disabled="false"

    document.getElementById("edit-icon5").style.display = "none";
  });
}
if (input6) {
  input6.addEventListener("click", function () {
    // input.disabled="false"

    document.getElementById("edit-icon6").style.display = "none";
  });
}
if (input7) {
  input7.addEventListener("click", function () {
    // input.disabled="false"

    document.getElementById("edit-icon7").style.display = "none";
  });
}
if (input8) {
  input8.addEventListener("click", function () {
    // input.disabled="false"

    document.getElementById("edit-icon8").style.display = "none";
  });
}



const Dashboard = () => {

  const [baseImg, setBaseImg] = useState();

  const [imgData, setImgData] = useState();

  const token = JSON.parse(localStorage.getItem("token"));

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

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    pincode: "",
    city: "",
    avatar: "",
  });

  const { firstName, lastName, email, address, city, state, pincode, phone } =
    data;

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

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    axios
      .patch(`${process.env.REACT_APP_HOST_URL}/user/updateCurrentUser`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        // console.log(res.data);
        if (!res) {
          danger("Something Went Wrong");
        }
        success(res.data.message);
        window.location.reload();
      })
      .catch((error) => {
        danger(error?.message);
      });
  };

  const handleUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("avatar", imgData);

    axios
      .patch(`${process.env.REACT_APP_HOST_URL}/user/updateAvatar`, formData, {
        headers: { Authorization: token },
      })
      .then((res) => {
        // console.log(res.data);
        if (!res) {
          danger("Something Went Wrong");
        }
        success(res.data.message);
        window.location.reload();
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
        if (!res) {
          danger("Something Went Wrong");
        }
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
          <div className="dashboard-wrapper">
            <div className="left-wrapper">
              <div className="profile-img">
                <img src={data.avatar} alt="profile" />
              </div>
              <div>
                <h1>
                  {firstName} {lastName}
                </h1>
              </div>
              <div>
                <p>{email}</p>
              </div>
            </div>
            <div className="center-wrapper">
              <div className="profile-title">
                <h1>Profile Settings</h1>
              </div>
              <div>
                <form className="form-wrapper" onSubmit={handleUpdate}>
                  <div className="d-row">
                    <div className="input-group">
                      <label>First name</label>
                      <input
                        type="text"
                        placeholder="first name"
                        name="firstName"
                        className="input-box"
                        value={firstName}
                        onChange={(e) => handleInput(e)}
                        id="input1"
                        onMouseOver={editInputFunc1}
                        onMouseOut={exitInputFunc1}
                      />
                      <div className="edit-icon" id="edit-icon1">
                        <MdModeEdit/>
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Last name</label>
                      <input
                        type="text"
                        placeholder="last name"
                        name="lastName"
                        className="input-box"
                        value={lastName}
                        onChange={(e) => handleInput(e)}
                        id="input2"
                        onMouseOver={editInputFunc2}
                        onMouseOut={exitInputFunc2}
                      />
                      <div className="edit-icon" id="edit-icon2">
                        <MdModeEdit/>
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      placeholder="enter phone number"
                      name="phone"
                      className="input-box"
                      value={phone}
                      onChange={(e) => handleInput(e)}
                      id="input3"
                      onMouseOver={editInputFunc3}
                      onMouseOut={exitInputFunc3}
                    />
                    <div className="edit-icon" id="edit-icon3">
                      <MdModeEdit />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="enter address"
                      name="address"
                      className="input-box"
                      value={address}
                      onChange={(e) => handleInput(e)}
                      id="input4"
                      onMouseOver={editInputFunc4}
                      onMouseOut={exitInputFunc4}
                    />
                    <div className="edit-icon" id="edit-icon4">
                      <MdModeEdit />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="enter email"
                      name="email"
                      className="input-box"
                      value={email}
                      onChange={(e) => handleInput(e)}
                      id="input5"
                      onMouseOver={editInputFunc5}
                      onMouseOut={exitInputFunc5}
                    />
                    <div className="edit-icon" id="edit-icon5">
                      <MdModeEdit />
                    </div>
                  </div>

                  <div className="d-row">
                    <div className="input-group">
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="enter city"
                        name="city"
                        className="input-box"
                        value={city}
                        onChange={(e) => handleInput(e)}
                        id="input6"
                        onMouseOver={editInputFunc6}
                        onMouseOut={exitInputFunc6}
                      />
                      <div className="edit-icon" id="edit-icon6">
                        <MdModeEdit />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>State</label>
                      <input
                        type="text"
                        placeholder="enter state"
                        name="state"
                        className="input-box"
                        value={state}
                        onChange={(e) => handleInput(e)}
                        id="input7"
                        onMouseOver={editInputFunc7}
                        onMouseOut={exitInputFunc7}
                      />
                      <div className="edit-icon" id="edit-icon7">
                        <MdModeEdit />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Pincode</label>
                      <input
                        type="number"
                        placeholder="enter pincode"
                        name="pincode"
                        className="input-box"
                        value={pincode}
                        onChange={(e) => handleInput(e)}
                        id="input8"
                        onMouseOver={editInputFunc8}
                        onMouseOut={exitInputFunc8}
                      />
                      <div className="edit-icon" id="edit-icon8">
                        <MdModeEdit />
                      </div>
                    </div>
                  </div>

                  <div className="change-pass-wrapper">
                    <Link to="/user/changePassword">
                      Change Password <RiLockPasswordFill />
                    </Link>
                  </div>
                  <div>
                    <button type="submit" className="btn-login">
                      Save profile
                    </button>
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
            <div className="right-wrapper">
              <form onSubmit={handleUpload}>
                <div className="input-group">
                  <label>Edit Profile Image</label>
                  <div className="update-profile-img">
                    <img src={baseImg} className="profileImg" />
                    <label className="upload-lable">Click and Upload</label>
                    <input
                      type="file"
                      placeholder=""
                      name="avatar"
                      onChange={handleImageChange}
                      className="update-input-file"
                    />
                  </div>
                  <button type="submit" className="btn-upload">
                    Upload
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

export default Dashboard;
