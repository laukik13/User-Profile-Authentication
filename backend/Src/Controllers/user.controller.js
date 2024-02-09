import { User } from "../Models/user.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../Utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { forgotPasswordMailgenContent, sendMail } from "../Utils/mailer.js";
import crypto from "crypto";

const genreateAccessRefreshToken = async (userId) => {
  //get user
  //generate access token
  //generate refresh token
  //return access and refresh token

  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while genrating access anf refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get data from user input
  //check data is empty
  //check data already register
  //upload avatar on cloudinary
  //check avatar
  //upload data on database
  //check user
  //return res

  const { firstName, lastName, email, phone, password } = req.body;

  if (
    [firstName, lastName, email, phone, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All Fields Are Empty !");
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new ApiError(400, "Email Id Already Exist");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Something Went Wrong While Uploading Data");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, createUser, "User Added Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //get username and password from user
  //check feilds are empty
  //check username already exists
  //compare password
  //check password
  //genreate access and refresh token
  //send cookies
  //return res

  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "All feilds are Empty");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User is Invalid");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password is Invalid");
  }

  const { accessToken, refreshToken } = await genreateAccessRefreshToken(
    user?._id
  );

  const loggedIn = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!loggedIn) {
    throw new ApiError(400, "Something Went wrong While get Data");
  }

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        201,
        {
          // user: loggedIn,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  //get user
  //set refreshToken undifind
  //clear cookies access//refresh
  //return res

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(201, {}, "User Logged Out Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //get refresh Token
  //check token
  //decode token
  //get user
  //check refesh token from cookie !== user refresh token
  //genreate access / refresh token
  //send cookie
  // return res

  const incomingToken = req.cookie?.refreshToken || req.body.refreshToken;

  if (!incomingToken) {
    throw new ApiError(200, "Token is Invalid");
  }

  try {
    const decodedToken = jwt.verify(
      incomingToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(400, "User is Invalid");
    }

    if (incomingToken !== user?.refreshToken) {
      throw new ApiError(400, "Refresh Token is used or not exists");
    }

    const { accessToken, refreshToken } = await genreateAccessRefreshToken(
      user?._id
    );

    const option = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json(
        new ApiResponse(
          201,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid refresh token");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  //get old password/new password/confirm password from user
  //check all feild empty or not
  //check newpassword === confrim Password
  //get user
  //check user
  //compare old password
  //check password
  //save password
  //return res

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword && !newPassword && !confirmPassword) {
    throw new ApiError("All feilds are Empty");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError("Confrirm Password Does not Match");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "User is Invalid");
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password is Invalid");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(201, {}, "New Password Changed Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(201, req.user, ""));
});

const updateCurrentUser = asyncHandler(async (req, res) => {
  //get input from user what to update
  //update user
  //return res

  const { firstName, lastName, email, phone, address, city, state, pincode } =
    req.body;

  // const avatarLocalPath = req.file?.path;

  // if (!avatarLocalPath) {
  //   throw new ApiError(200, "Avatar file is required");
  // }

  // await deleteFromCloudinary(req.user?.avatar);

  // const avatar = await uploadOnCloudinary(avatarLocalPath);

  // if (!avatar) {
  //   throw new ApiError(200, "Avatar file is required");
  // }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        // avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(201, user, "User Update Successfully"));
});


const getAllUser = asyncHandler(async(req,res)=>{

  const user = await User.find();

  if(!user){
    throw new ApiError(400,"Something Went Wrong While fetching Data")
  }

  res.status(200).json(
    new ApiResponse(201,user,"User Data Fetch Success")
  )

})

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  //get email from user
  //check email
  //get reset password token
  //save reset token and expire on db
  //send mail using mailer.js
  //return res

  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email field is Empty");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Email ID not found");
  }

  const { unHashedToken, hashedtoken, tokenExpiry } =
    await user.generateResetPasswordToken();

  user.forgotPasswordToken = hashedtoken;
  user.forgotPasswordExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });


  const otp = Math.floor(Math.random()*10000000 + 1);


  await sendMail({
    email: user?.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user?.firstName,
      // `${req.protocol}://${req.get(
      //   "host"
      // )}/api/v1/user/resetPassword/${unHashedToken}`
      otp
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(201,{ otp, unHashedToken},"Password reset mail has been sent on Mail Id")
    );
});

const forgotPasswordReset = asyncHandler(async (req, res) => {
  //get token from url
  //get newpassword and confirmPasssword from user
  //hashed token
  //check token in db
  //check newpassword !== confirmpassword
  //set reset token / expire undefined
  //save oldpassword to newpassword in db
  //return res

  const { resetToken } = req.params;
  const { newPassword, confirmPassword } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Reset Token is Invalid");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Confirm Password Does not Match");
  }

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(201, {}, "Password reset Successfully"));
});

//Separate Update for avatar
const updateAvatar = asyncHandler(async (req, res) => {
  //get file from user
  //check file
  //upload on cloudiary
  //get url
  //update avatar
  //return res

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(200, "Avatar file is required");
  }

  await deleteFromCloudinary(req.user?.avatar);

  const avatar = await uploadOnCloudinary(avatarLocalPath);

 

  if (!avatar) {  
    throw new ApiError(200, "Avatar file is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(201, user, "Avatar update Successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  getAllUser,
  updateCurrentUser,
  updateAvatar,
  forgotPasswordRequest,
  forgotPasswordReset,
};
