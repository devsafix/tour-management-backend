import express from "express";
import { PaymentController } from "./payment.controller";

export const PaymentRoutes = express.Router();

PaymentRoutes.post("/init-payment/:bookingId", PaymentController.initPayment);
PaymentRoutes.post("/success", PaymentController.successPayment);
PaymentRoutes.post("/fail", PaymentController.failPayment);
PaymentRoutes.post("/cancel", PaymentController.cancelPayment);
