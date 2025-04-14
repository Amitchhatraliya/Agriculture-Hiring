//router
const routes = require("express").Router()
//controller
const userController = require("../controllers/UserController")
routes.get("/users",userController.getAllUsers)
// routes.get("/users",userController.addUser1)
routes.post("/user",userController.addUser)
// routes.delete("/user/:id",userController.deleteUser)
// routes.get("/user/:id",userController.getUserById)
routes.post("/user/login",userController.loginUser)
routes.post("/user/signup",userController.signUp)
routes.post("/user/employeesignup",userController.employeeSignup)
routes.post("/user/workersignup",userController.workerSignup)
routes.post("/user/adminsignup",userController.adminSignup)

module.exports = routes       