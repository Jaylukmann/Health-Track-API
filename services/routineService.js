//Refactoring service from controller require that the service perform the logic of the apdatabase
//like saving to the database, fetching from the database, updating and deleting from the 
//and performing pagination,filtering,sorting and searching.

import routineModel from "../models/routineModel.js";

export const createRoutine = async (routineData) => {
  const newRoutine = new routineModel(routineData);
  return await newRoutine.save();
};

export const getAllRoutines = async ({ search, page, limit }) => {
  const filter = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const skip = (page - 1) * limit;

  const routines = await routineModel
    .find(filter)
    .populate( "user","name _id email")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  return routines;
};

export const getRoutineById = async (routineId) => {
  const routine = await routineModel.findByIdAndUpdate(
    routineId,
    { $inc: { views: 1 } },
    { new: true }
  );


  return routine;
};

export const editRoutine = async (routineId, userId, routineData) => {
  const routine = await routineModel.findById(routineId);

  if (!routine) {
    throw new Error("Routine not found");
  }

  if (routine.user.toString() !== userId.toString()) {
    throw new Error("You are not authorized to edit this routine");
  }

  const allowedFields = [
    "title",
    "type",
    "description",
    "frequency",
    "time",
    "startDate",
    "endDate",
    "routineStatus"
  ];

  const updateData = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(routineData, field)) {
      updateData[field] = routineData[field];
    }
  }

  const updatedRoutine = await routineModel.findByIdAndUpdate(
    routineId,
    { $set: updateData },
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedRoutine) {
    throw new Error("Routine not found");
  }

  return updatedRoutine;
};

export const deleteRoutine = async (routineId, userId) => {
  const routine = await routineModel.findById(routineId);

  if (!routine) {
    throw new Error("Routine not found");
  }

  if (routine.user.toString() !== userId.toString()) {
    throw new Error("You are not authorized to delete this routine");
  }

  const deletedRoutine = await routineModel.findByIdAndDelete(routineId);

  return deletedRoutine;
};