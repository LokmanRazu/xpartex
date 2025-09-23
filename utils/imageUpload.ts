import * as fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dh6vix46o",
    api_key: process.env.CLOUDINARY_API_KEY || "577111524316927",
    api_secret: process.env.CLOUDINARY_API_SECRET ||  "pX58fP5KecropHKQutPaVj3-J1s", 
    
}); 

export const uploadImageToCloudinary = async (localPath) => {
    try {
        if (!localPath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localPath,{resource_type:"auto"}); 
        fs.unlinkSync(localPath);
        console.log('File upload on cloudinary', response.url);
        return response 
    } catch (error) {
        fs.unlinkSync(localPath);
        console.log(error);
        return null
    }
    
}


import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';


export function MultiFileUploadInterceptor(fields: { name: string; maxCount: number }[]) {
  const storage = multer.diskStorage({
    destination: './public/temp', // make sure this folder exists
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  });

//   const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   };
  return FileFieldsInterceptor(fields, {
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}