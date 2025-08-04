/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../errorHelpers/AppError";

export interface IInvoiceData {
  transactionId: string;
  bookingDate: Date;
  userName: string;
  tourTitle: string;
  guestCount: number;
  totalAmount: number;
}

export const generatePdf = async (
  invoiceData: IInvoiceData
): Promise<Buffer> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (err) => reject(err));

      // Header
      doc
        .fontSize(26)
        .fillColor("#0033cc")
        .text("INVOICE", { align: "center" });

      doc.moveDown(1.5);
      doc
        .strokeColor("#cccccc")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(1.5);

      // Invoice Info
      doc.fontSize(14).fillColor("#000");
      doc.text(`Transaction ID: ${invoiceData.transactionId}`);
      doc.text(`Booking Date: ${invoiceData.bookingDate.toDateString()}`);
      doc.text(`Customer Name: ${invoiceData.userName}`);

      doc.moveDown(1.5);

      // Booking Summary
      doc
        .fontSize(16)
        .fillColor("#0033cc")
        .text("Booking Summary", { underline: true });

      doc.moveDown(0.5);
      doc.fontSize(14).fillColor("#000");
      doc.text(`Tour: ${invoiceData.tourTitle}`);
      doc.text(`Guest Count: ${invoiceData.guestCount}`);
      doc.text(`Total Amount: $${invoiceData.totalAmount.toFixed(2)}`);

      doc.moveDown(2);

      // Thank you message
      doc
        .fontSize(14)
        .fillColor("#555")
        .text("Thank you for booking with us!", { align: "center" });

      doc.end();
    });
  } catch (error: any) {
    throw new AppError(401, `PDF creation error: ${error.message}`);
  }
};
