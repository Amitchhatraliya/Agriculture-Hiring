const userCompanyModel = require("../models/UserCompanyModel");
const addUserCompany = async (req, res) => {
  try {
    const savedUserCompany = await userCompanyModel.create(req.body);
    res.status(201).json({
      message: "Company added successfully",
      data: savedUserCompany,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const getUserCompany = async(req,res)=>{
    try{
        const addedusercompany = await userCompanyModel.find().populate("userId companyId")
        res.status(201).json({
            message:"User Company fetched succesfully",
            data:addedusercompany
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
};
module.exports = {
    addUserCompany,getUserCompany
}