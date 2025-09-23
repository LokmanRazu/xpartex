import { hashSync, compare } from "bcrypt";

export function hashPassword(text: string): string {
    return hashSync(text, 12)
}

export function comparePassword(hashPassword: string, plainPassword: string): Promise<boolean> {
    return compare(plainPassword, hashPassword);  
}


import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

export function localFileFieldsUpload(
  fields: { name: string; maxCount: number }[],
  destination = './public/temp',
  maxSizeMB = 5,
) {
  return FileFieldsInterceptor(fields, {
    storage: diskStorage({
      destination,
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); 
        const fileExtName = extname(file.originalname);
        cb(null, `${uniqueSuffix}${fileExtName}`);
      },
    }),
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
  });
}
