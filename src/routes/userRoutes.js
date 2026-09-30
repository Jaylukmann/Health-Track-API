import express from "express";


import validateRegistration from "../validators/validateRegistration.js";
import validateLogin from "../validators/validateLogin.js";

import {
  registerUserController,
  loginUserController
} from "../controllers/userController.js";



const router = express.Router();

router.post(
  "/register",
  validateRegistration,
  registerUserController
);

router.post(
  "/login",
  validateLogin,
  loginUserController
);

export default router;