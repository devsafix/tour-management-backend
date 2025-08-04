import express from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

export const PaymentRoutes = express.Router();

PaymentRoutes.post("/init-payment/:bookingId", PaymentController.initPayment);
PaymentRoutes.post("/success", PaymentController.successPayment);
PaymentRoutes.post("/fail", PaymentController.failPayment);
PaymentRoutes.post("/cancel", PaymentController.cancelPayment);
PaymentRoutes.get("/invoice/:paymentId", checkAuth(...Object.values(Role)), PaymentController.getInvoiceDownloadUrl);
