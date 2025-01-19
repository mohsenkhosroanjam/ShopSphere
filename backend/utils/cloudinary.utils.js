import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'

// const streamifier = require('streamifier');


// Cloudinary configuration
cloudinary.config({
  cloud_name: 'your cloudinary config',
  api_key: 'your cloudinary config',
  api_secret: 'your clodinary config',
  secure: true,
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
          folder: folderName, // Optional folder in Cloudinary
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url); // Return the secure URL of the uploaded image
          }
        }
      );

      // Pipe the file buffer to Cloudinary's upload stream
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (error) {
    console.error("Error during Cloudinary upload:", error);
    throw error;
  }
};

export { upload_on_cloudinary };
