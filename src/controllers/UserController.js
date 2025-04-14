const userModel = require("../models/UserModel")
const bcrypt=require("bcrypt")
const mailUtil = require("../utils/MailUtil")

// const addUser1=async(req,res)=>{
//     try{

//         const createdUser = await userModel.create(req.body)
//         res.status(201).json({
//             message:"user created.",
//             data:createdUser
//         })

//     }catch(err){
//         res.status(500).json({
//             message:"error",
//             data:err
//     })
//     }
// }

const signUp = async(req,res)=>{
    try{
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password,salt)
        req.body.password = hashedPassword
        const Createduser = await userModel.create(req.body)
        await mailUtil.sendingMail(Createduser.email,"welcome to agriculturehiring","this is welcome mail")
        res.status(201).json({
            message:"user created successfully",
            data:Createduser
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error",
            data:err
        })
    }
}

const employeeSignup = async (req, res) => {
    try {
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
  
      // Add roleId for employees (if needed)
    //   req.body.roleId = "employeeRoleId"; // Replace with the actual role ID for employees
  
      // Create the employee in the database
      const createdEmployee = await userModel.create(req.body);
  
      // Send success response
      res.status(201).json({
        message: "Employee created successfully",
        data: createdEmployee,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error creating employee",
        data: err,
      });
    }
  };

  const workerSignup = async (req, res) => {
    try {
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
  
      // Add roleId for employees (if needed)
    //   req.body.roleId = "employeeRoleId"; // Replace with the actual role ID for employees
  
      // Create the employee in the database
      const createdWorker = await userModel.create(req.body);
  
      // Send success response
      res.status(201).json({
        message: "Worker created successfully",
        data: createdWorker,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error creating worker",
        data: err,
      });
    }
  };

  const adminSignup = async (req, res) => {
    try {
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
  
      // Add roleId for admins (if needed)
    //   req.body.roleId = "adminRoleId"; // Replace with the actual role ID for admins
  
      // Create the admin in the database
      const createdAdmin = await userModel.create(req.body);
  
      // Send success response
      res.status(201).json({
        message: "Admin created successfully",
        data: createdAdmin,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error creating admin",
        data: err,
      });
    }
  };

const loginUser = async(req,res)=>{
    
        const email = req.body.email
        const password = req.body.password

        console.log(email,password)

        const foundUserFromEmail = await userModel.findOne({email :  email}).populate("roleId")
        console.log(foundUserFromEmail)
        if(foundUserFromEmail != null){
            const isMatch = await bcrypt.compare(password, foundUserFromEmail.password)
            console.log(isMatch)
            if(isMatch == true ){
                res.status(200).json({
                    message:"login success",
                    data:foundUserFromEmail
                })
            }else{
                res.status(404).json({
                    message:"invalid credentials",
                })
        }
        }else{
            res.status(404).json({
                message:"email not found..",
            })
        }
    }



const getAllUsers = async (req,res) => {
    const users = await userModel.find().populate("roleId")

    res.json({
        message:"Data Fetched Successfully...",
        data:users
    })
}

const addUser = async(req,res) => {
    const savedUser = await userModel.create(req.body)

    res.json({
        message:"Data Added Successfully...",
        data:savedUser
    })
}

// const deleteUser = async(req,res) => {
//     const deletedUser = await userModel.findByIdAndDelete(req.params.id)

//     res.json({
//         message:"Data Deleted Successfully...",
//         data:deletedUser
//     })
// }

// const getUserById = async(req,res) => {
//     const foundUser = await userModel.findById(req.params.id)

//     res.json({
//         message:"User Found...",
//         data:foundUser
//     })
// }

module.exports = {
    getAllUsers,addUser,signUp,loginUser,employeeSignup,workerSignup,adminSignup
}