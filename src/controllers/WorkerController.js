const workerModel = require("../models/WorkerModel");
const bcrypt = require('bcrypt')

const addWorker = async (req, res) => {
  try {
    const savedWorker = await workerModel.create(req.body);
    res.status(201).json({
      message: "Worker added successfully",
      data: savedWorker,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWorker = async (req, res) => {
    try {
      const createdWorker = await workerModel.find()
      res.status(200).json({
        message: "Worker found",
        data: createdWorker,
      });
    } catch (err) {
      res.status(500).json({
        message: "Worker not found",
      });
    }
  };

  const loginWorker = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login attempt:", email); // Log email for debugging
  
      const worker = await workerModel.findOne({ email }).populate("roleId");
      if (!worker) {
        console.log("Worker not found for email:", email);
        return res.status(404).json({ message: "Worker not found." });
      }
  
      console.log("Found worker:", worker);
  
      const isPasswordValid = await bcrypt.compare(password, worker.password);
      if (!isPasswordValid) {
        console.log("Invalid password for email:", email);
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      res.status(200).json({
        message: "Logged in successfully",
        data: worker,
      });
    } catch (error) {
      console.error("Login error:", error); // Capture full error stack
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { addWorker, getWorker, loginWorker }