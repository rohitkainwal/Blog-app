import v2 from "../config/cloudinary.config.js"
import CustomError from "./CustomError.util.js"

export const uploadImage = async(imageURL)=>{
    console.log(imageURL)
try {
    const resp = await v2.uploader.upload(imageURL,{ folder:"blogs",});
    return resp;
} catch (error) {
    throw new CustomError(500, error.message);
}
};



export const deleteImage = async(publicId) =>{
    console.log(publicId)
try {
    const resp = await v2.uploader.destroy(publicId);
    return resp;
} catch (error) {
     throw new CustomError(500, error.message);
}
};