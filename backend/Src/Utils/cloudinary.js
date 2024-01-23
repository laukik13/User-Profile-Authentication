import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "user",
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);

    console.log(error);
  }
};

const deleteFromCloudinary = async (localFilePath) => {
  try {

    if (!localFilePath) return null;

    const public_id = extractPublicId(localFilePath);

    const response = await cloudinary.uploader.destroy(public_id,{
      resource_type: "image",
    })

    return response;
    
  } catch (error) {

    console.log(error);

  }
};

export { uploadOnCloudinary , deleteFromCloudinary };
