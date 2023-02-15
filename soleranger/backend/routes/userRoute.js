const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser } = require('../controllers/userController');
const router = express.Router();

const {isAuthenticatedUser,isAdmin} = require("../middleware/auth")


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword) // Not working right now
router.route("/password/reset/:token").put(resetPassword);
router.route('/logout').get(isAuthenticatedUser,logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,isAdmin("admin"),getAllUser);
router.route("/admin/users/:id").get(isAuthenticatedUser,isAdmin("admin"),getSingleUser).put(isAuthenticatedUser,isAdmin("admin"),updateRole).delete(isAuthenticatedUser,isAdmin("admin"),deleteUser);
// router.route()


module.exports = router;