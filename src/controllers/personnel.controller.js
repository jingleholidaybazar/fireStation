import { asyncHandler } from "../utils/asyncHandler.js";
import { Personnel } from "../models/personnel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createPersonnel = asyncHandler(async (req, res) => {
  const { name, position, badge, status, team, email, Phone } = req.body;
  if (!name || !position || !badge || !status || !team || !email || !Phone) {
    throw new ApiError(400, "All fields are required");
  }
  const existsingPersonnel = await Personnel.find({ email });
  if (existsingPersonnel) {
    throw new ApiError(400, "Personnel already exists");
  }
  const newPersonnel = await Personnel.create({
    name,
    position,
    badge,
    status,
    team,
    email,
    Phone,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newPersonnel, "Personnel Created Successfully"));
});

const getAllPersonnel = asyncHandler(async (req, res) => {
  const personnel = await Personnel.find({});
  res.status(200).json(new ApiResponse(200, personnel, "All Personnel"));
});

const getPersonnelById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Personnel ID");
  }
  const personnel = await Personnel.findById(id);
  if (!personnel) {
    throw new ApiError(404, "Personnel not found");
  }
  res.status(200).json(new ApiResponse(200, personnel, "Personnel found"));
});

const updatePersonnel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Personnel ID");
  }
  const personnel = await Personnel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!personnel) {
    throw new ApiError(404, "Personnel not found");
  }
  res.status(200).json(new ApiResponse(200, personnel, "Personnel updated"));
});

const deletePersonnel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Personnel ID");
  }
  const personnel = await Personnel.findByIdAndDelete(id);
  if (!personnel) {
    throw new ApiError(404, "Personnel not found");
  }
  res.status(200).json(new ApiResponse(200, personnel, "Personnel deleted"));
});
export {
  createPersonnel,
  getAllPersonnel,
  getPersonnelById,
  updatePersonnel,
  deletePersonnel,
};
