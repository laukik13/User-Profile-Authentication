import { Router } from "express";
import { changePassword, forgotPasswordRequest, forgotPasswordReset, getAllUser, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAvatar, updateCurrentUser } from "../Controllers/user.controller.js";
import { upload } from "../Middlewares/Multer.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount: 1
    }
]),registerUser);

router.route("/login").post(loginUser);

router.route("/forgotPassword").post(forgotPasswordRequest);

router.route("/resetPassword/:resetToken").post(forgotPasswordReset);

//secure
router.route("/logout").post(verifyJwt,logoutUser);

router.route("/refresh-accesstoken").post(refreshAccessToken);

router.route("/changePassword").post(verifyJwt,changePassword);

router.route("/getCurrentUser").get(verifyJwt,getCurrentUser);

router.route("/getAllUser").get(verifyJwt,getAllUser);

router.route("/updateCurrentUser").patch(verifyJwt,upload.single("avatar"),updateCurrentUser);

//seperate avatar update
router.route("/updateAvatar").patch(verifyJwt,upload.single("avatar"),updateAvatar);

export default router;

