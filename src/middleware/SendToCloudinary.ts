import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import multer from 'multer';
import fs from 'fs'
import config from '../app/config';

//configaration
cloudinary.config({
    cloud_name: config.cloudinary__app_name,
    api_key: config.cloudinary__app_key,
    api_secret: config.cloudinary__secret_key
});


export const sendImageToCloudinary = async (
    path: string
): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            { public_id:Date.now().toString() },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) {
                    reject(error);
                }
                if (result) {
                    resolve(result);
                }
                fs.unlink(path, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('file is deleted');
                    }
                });
            }
        );
    });
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })