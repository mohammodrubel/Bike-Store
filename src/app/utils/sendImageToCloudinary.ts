import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs'

//configaration
cloudinary.config({
    cloud_name: config.cloudinary__app_name,
    api_key: config.cloudinary__app_key,
    api_secret: config.cloudinary__secret_key
});


export const sendImageToCloudinary = async (imageName: string, path: string) => {

    return new Promise((resolve,reject)=>{
        // Upload an image
        cloudinary.uploader.upload(
            path,
            {
                public_id: imageName,
            },
            function(error,result){
                if(error){
                    reject(error)
                }
                resolve(result)
                fs.unlink(path,(err)=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log('file is deleted')
                    }
                })
            }
        )
       
    })
}

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