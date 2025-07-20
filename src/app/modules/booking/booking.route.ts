import express from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { BookingController } from "./booking.controller";
import {
  createBookingZodSchema,
  updateBookingStatusZodSchema,
} from "./booking.validation";

export const BookingRoutes = express.Router();

// api/v1/booking
BookingRoutes.post(
  "/",
  checkAuth(...Object.values(Role)),
  validateRequest(createBookingZodSchema),
  BookingController.createBooking
);

// api/v1/booking
BookingRoutes.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BookingController.getAllBookings
);

// api/v1/booking/my-bookings
BookingRoutes.get(
  "/my-bookings",
  checkAuth(...Object.values(Role)),
  BookingController.getUserBookings
);

// api/v1/booking/bookingId
BookingRoutes.get(
  "/:bookingId",
  checkAuth(...Object.values(Role)),
  BookingController.getSingleBooking
);

// api/v1/booking/bookingId/status
BookingRoutes.patch(
  "/:bookingId/status",
  checkAuth(...Object.values(Role)),
  validateRequest(updateBookingStatusZodSchema),
  BookingController.updateBookingStatus
);
