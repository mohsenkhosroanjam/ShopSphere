import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
import dotenv from 'dotenv'

// const streamifier = require('streamifier');

dotenv.config()

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const upload_on_cloudinary = async (fileBuffer, folderName = "ProductImages") => {
  try {
    if (!fileBuffer) {
      console.log("No file buffer provided");
      return null;
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'Circle',
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (error) {
    console.error("Error during Cloudinary upload:", error);
    throw error;
  }
};

const extractPublicIdFromUrl = (cloudinaryUrl) => {
  if (!cloudinaryUrl) return null;
  
  try {
    // Cloudinary URLs typically follow this pattern:
    // https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder/public_id.extension
    
    // Split the URL by '/'
    const urlParts = cloudinaryUrl.split('/');
    
    // Get the last part which contains public_id.extension
    const lastPart = urlParts[urlParts.length - 1];
    
    // Remove the file extension
    const publicIdWithFolder = lastPart.split('.')[0];
    
    // If there are upload parameters like v1234567890, we need to get everything after that
    const uploadParamIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadParamIndex !== -1 && uploadParamIndex + 2 < urlParts.length) {
      // Check if the part after 'upload' starts with 'v' followed by numbers (version)
      if (urlParts[uploadParamIndex + 1].match(/^v\d+$/)) {
        // Join all parts after the version to get the full public_id including folder
        return urlParts.slice(uploadParamIndex + 2).join('/').split('.')[0];
      }
    }
    
    // If no version parameter, just return the last part without extension
    return publicIdWithFolder;
  } catch (error) {
    console.error('Error extracting public_id from Cloudinary URL:', error);
    return null;
  }
};

const delete_from_cloudinary = async (publicId) => {
  if (!publicId) return null;
  
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Image deleted from Cloudinary: ${publicId}`);
    return result;
  } catch (error) {
    console.error(`Error deleting image from Cloudinary: ${publicId}`, error);
    return null;
  }
};

export { upload_on_cloudinary, extractPublicIdFromUrl, delete_from_cloudinary };  
