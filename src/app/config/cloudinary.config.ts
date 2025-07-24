import { v2 as cloudinary } from "cloudinary";
import { envVariables } from "./env";

cloudinary.config({
  cloud_name: envVariables.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: envVariables.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: envVariables.CLOUDINARY.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = cloudinary;
