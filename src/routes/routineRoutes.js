import express from "express";

import {
  createRoutineController,
  getAllRoutinesController,
  getRoutineByIdController,
  editRoutineController,
  deleteRoutineController
} from "../controllers/routineController.js";

import validateCreateRoutine from "../validators/validateCreateRoutine.js";
import validateEditRoutine from "../validators/validateEditRoutine.js";
import validateDeleteRoutine from "../validators/validateDeleteRoutine.js";

import userAuth from "../middlewares/userAuth.js";


const router = express.Router();

router.post(
  "/createRoutine",
  userAuth,

  validateCreateRoutine,
  createRoutineController
);

router.get(
  "/getAllRoutines",
  userAuth,
  getAllRoutinesController
);

router.get(
  "/getRoutineById/:id",
  userAuth,
  getRoutineByIdController
);

router.put(
  "/editRoutine/:id",
  userAuth,
  validateEditRoutine,
  editRoutineController
);

router.delete(
  "/deleteRoutine/:id",
  userAuth,
  validateDeleteRoutine,
  deleteRoutineController
);

export default router;