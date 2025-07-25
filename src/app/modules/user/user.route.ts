import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

export const UserRoutes = Router();

// Register an user
UserRoutes.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

// Get single login user
UserRoutes.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);

// Get single user
UserRoutes.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  UserControllers.getSingleUser
);

// Fetch all users
UserRoutes.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUser
);

// Update user
UserRoutes.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserControllers.updateUser
);
