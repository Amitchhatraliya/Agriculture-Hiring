const employerModel = require("../models/EmployerModel");
const bcrypt = require("bcrypt")

const addEmployer = async (req, res) => {
  try {
    const savedEmployer = await employerModel.create(req.body);
    res.status(201).json({
      message: "Employer added successfully",
      data: savedEmployer,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getemployer = async (req, res) => {
    try{
        const createdEmployer = await employerModel.find();
        res.status(200).json({
            message: "All Employers fetched successfully",
            data: createdEmployer
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

const loginEmployer = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login attempt:", email); // Log email for debugging
  
      const employer = await employerModel.findOne({ email }).populate("roleId");
      if (!employer) {
        console.log("Employer not found for email:", email);
        return res.status(404).json({ message: "Employer not found." });
      }
  
      console.log("Employer:", employer);
  
      const isPasswordValid = await bcrypt.compare(password, employer.password);
      if (!isPasswordValid) {
        console.log("Invalid password for email:", email);
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      res.status(200).json({
        message: "Logged in successfully",
        data: employer,
      });
    } catch (error) {
      console.error("Login error:", error); // Capture full error stack
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { addEmployer, getemployer, loginEmployer }
