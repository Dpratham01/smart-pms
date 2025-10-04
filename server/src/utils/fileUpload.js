import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Storage configuration for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "smart-pms",
    allowed_formats: ["pdf", "doc", "docx", "png", "jpg", "jpeg"],
  },
});

export const upload = multer({ storage });

export const uploadFile = async (filePath, folder = "smart-pms") => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return result.secure_url;
};
