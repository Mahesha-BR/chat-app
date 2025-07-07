// import "dotenv/config.js";
// import {v2 as cloudinary} from "cloudinary";

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     cloudinary_key:process.env.CLOUDINARY_API_KEY,
//     cloudinary_secret:process.env.CLOUDINARY_API_SECRET,

// });
// export default cloudinary;


import "dotenv/config.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
