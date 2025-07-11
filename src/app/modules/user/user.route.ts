import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";

export const UserRoutes = Router();

// register an user
UserRoutes.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

// Fetch all users
UserRoutes.get("/all-users", UserControllers.getAllUser);
