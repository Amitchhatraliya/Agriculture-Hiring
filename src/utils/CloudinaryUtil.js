// const cloudinary = require("cloudinary").v2;
const cloudinary = require("cloudinary").v2

const uploadFileToCloudinary = async (file) => {

    //conif
        cloudinary.config({
        cloud_name:"damx6wdzt",
        api_key:"236397752595463",
        api_secret:"vwEsRAK08qY5pgq9wo7cGeJFSvE"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}