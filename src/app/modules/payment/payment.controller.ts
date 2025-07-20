import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";
import { envVariables } from "../../config/env";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const result = await PaymentServices.initPayment(bookingId as string);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Payment done successfully",
    data: result,
  });
});
const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentServices.successPayment(
    query as Record<string, string>
  );

  if (result.success) {
    res.redirect(
      `${envVariables.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const failPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentServices.failPayment(
    query as Record<string, string>
  );

  if (!result.success) {
    res.redirect(
      `${envVariables.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const cancelPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentServices.cancelPayment(
    query as Record<string, string>
  );

  if (!result.success) {
    res.redirect(
      `${envVariables.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

export const PaymentController = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
