import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  api_key: process.env.CLOUDINARY_API_KEY ?? "",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

const storage = multer.memoryStorage();

const imageUploadUtil = async (fileBuffer: Buffer) => {
  const base64 = fileBuffer.toString("base64");
  const dataURI = `data:image/png;base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });

  return result.secure_url;
};

const upload = multer({ storage });

export { upload, imageUploadUtil };
