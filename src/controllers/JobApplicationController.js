const jobApplicationModel = require("../models/JobApplication");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");



const storage = multer.diskStorage({
    destination:"./uploads",
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

// const upload = multer({
//     storage:storage,
// }).single("image")

const upload = multer({
  storage: storage,
}).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverletter', maxCount: 1 }
]);



const addJobApplication = async (req, res) => {
  try {
    const savedJobApplication = await jobApplicationModel.create(req.body);
    res.status(201).json({
      message: "Job Application added successfully",
      data: savedJobApplication,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const addJobApplicationWithFile = async(req,res)=>{
//     upload(req,res,async(err)=>{
//         if(err){
//             res.status(500).json({
//                 message:err.message,
//             })
//         }else{
//             const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file)
//             console.log(cloudinaryResponse)
//             console.log(req.body)

//             req.body.resume = cloudinaryResponse.secure_url
//             req.body.coverletter = cloudinaryResponse.secure_url
//             const jobapplication= await jobApplicationModel.create(req.body)
            

//             res.status(200).json({
//                 message:"Job Application file saved successfully",
//                 data:jobapplication
//             })
//         }
//     })
// };

const addJobApplicationWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Upload error', error: err.message });
    }

    try {
      console.log('FILES:', req.files);
      console.log('BODY:', req.body);

      const { firstName, lastName, workerId, jobId } = req.body;

      if (!firstName || !lastName || !workerId || !jobId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      if (!req.files?.resume || !req.files?.coverletter) {
        return res.status(400).json({ message: 'Missing resume or cover letter files' });
      }

      const resumeUpload = await cloudinaryUtil.uploadFileToCloudinary(req.files.resume[0]);
      const coverletterUpload = await cloudinaryUtil.uploadFileToCloudinary(req.files.coverletter[0]);

      const jobapplication = await jobApplicationModel.create({
        firstName,
        lastName,
        resume: resumeUpload.secure_url,
        coverletter: coverletterUpload.secure_url,
        workerId,
        jobId,
      });

      console.log('Created application:', jobapplication);

      res.status(201).json({
        message: 'Job Application with file saved successfully',
        data: jobapplication,
      });
      console.log('Received resume file:', req.files?.resume?.[0]);
      console.log('Received coverletter file:', req.files?.coverletter?.[0]);

    } catch (uploadError) {
      console.error('Error saving application:', uploadError);
      res.status(500).json({ message: 'Server error', error: uploadError.message });
    }
  });
};


const getAllJobApplicationWithFile = async (req, res) => {
  try {
    const applications = await jobApplicationModel.find();
    res.status(200).json({
      message: "All job applications with files retrieved successfully",
      data: applications,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve job applications",
      error: err.message,
    });
  }
};


const getAllJobApplication = async (req, res) => {
    try {
      const jobs = await jobModel.find()
      res.status(200).json({
        message: "Job Application found",
        data: jobs,
      });
    } catch (err) {
      res.status(500).json({
        message: "Job Application not found",
      });
    }
  };

module.exports = { addJobApplication, addJobApplicationWithFile, getAllJobApplication, getAllJobApplicationWithFile };