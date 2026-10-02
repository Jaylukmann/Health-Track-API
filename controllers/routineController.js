 //The controller will only handle the request and response and call the service to perform the logic.

import {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  editRoutine,
  deleteRoutine
} from "../services/routineService.js";

export const createRoutineController = async (req, res, next) => {
  try {
    const {
      title,
      type,
      description,
      frequency,
      time,
      startDate,
      endDate,
      routineStatus
    } = req.body;

    const newRoutine = await createRoutine({
     user: req.user.id,
      title,
      type,
      description,
      frequency,
      time,
      startDate,
      endDate,
      routineStatus 
    });

    return res.status(201).json({
      message: "Routine created successfully",
      data: newRoutine
    });

  } catch (error) {
    next(error);
  }
};


export const getAllRoutinesController = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const Routines = await getAllRoutines({
      search,
      page,
      limit
    });

    return res.status(200).json({
      message: "Routine fetched successfully",
      data: Routines
    });

  } catch (error) {
    next(error);
  }
};


export const getRoutineByIdController = async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.id);

    if (!routine) {
      return res.status(404).json({
        message: "Routine not found"
      });
    }

    return res.status(200).json({
      message: "Routine fetched successfully",
      data: routine
    });

  } catch (error) {
    next(error);
  }
};


export const editRoutineController = async (req, res, next) => {
  try {
    const {
      title,
      type,
      description,
      frequency,
      time,
      startDate,
      endDate,
      routineStatus
    } = req.body;

    const updatedRoutine = await editRoutine(
      req.params.id,
      req.user.id,
      {
        title,
        type,
        description,
        frequency,
        time,
        startDate,
        endDate,
        routineStatus
      }
    );

    if (!updatedRoutine) {
      return res.status(404).json({
        message: "Routine not found or you are not the author of the routine"
      });
    }

    return res.status(200).json({
      message: "Routine updated successfully",
      data: updatedRoutine
    });

  } catch (error) {
    next(error);
  }
};


export const deleteRoutineController = async (req, res, next) => {
  try {
    const deletedRoutine = await deleteRoutine(
      req.params.id,
      req.user.id
    );

    if (!deletedRoutine) {
      return res.status(404).json({
        message: "Routine not found or you are not the owner of the routine"
      });
    }

    return res.status(200).json({
      message: "Routine deleted successfully",
      data: deletedRoutine
    });

  } catch (error) {
    next(error);
  }
};

