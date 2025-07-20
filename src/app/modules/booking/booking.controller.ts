import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload;

  const booking = await bookingServices.createBooking(
    req.body,
    decodeToken.userId
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await bookingServices.getUserBookings();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingServices.getBookingById();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrieved successfully",
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bookings = await bookingServices.getAllBookings();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: {},
    // meta: {},
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const updated = await bookingServices.updateBookingStatus();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking Status Updated Successfully",
    data: updated,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getUserBookings,
  updateBookingStatus,
};
