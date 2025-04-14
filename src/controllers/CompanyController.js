const companyModel = require("../models/CompanyModel");

const addCompany = async (req, res) => {
  try {
    const savedCompany = await companyModel.create(req.body);
    res.status(201).json({
      message: "Company added successfully",
      data: savedCompany,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

const getcompany = async(req,res)=>{
    try{
        const addedcompany = await companyModel.find().populate("stateId cityId")
        res.status(201).json({
            message:"Company fetched succesfully",
            data:addedcompany
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
};

const getAllCompanyByUserId = async (req, res) => {
  
  try {
    const createdCompany = await companyModel
      .find({userId:req.params.userId})
      .populate("stateId cityId");
    if (comapany.length === 0) {
      res.status(404).json({ message: "No Company found" });
    } else {
      res.status(200).json({
        message: "Company found successfully",
        data: createdCompany,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addCompany, getcompany, getAllCompanyByUserId };