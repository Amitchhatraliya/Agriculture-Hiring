const express=require("express")//express....
const mongoose=require("mongoose")
const cors=require("cors")

//express object..

const app=express()
app.use(cors())
app.use(express.json())

//import roles routes
const roleRoutes=require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const companyRoutes = require("./src/routes/CompanyRoutes")
app.use("/company",companyRoutes)

const userCompanyRoutes = require("./src/routes/UserComanyRoutes")
app.use("/usercompany",userCompanyRoutes)

const jobRoutes = require("./src/routes/JobRoutes")
app.use("/job",jobRoutes)

const jobApplicationRoutes = require("./src/routes/JobApplicationRoutes")
app.use("/jobapplication",jobApplicationRoutes)

const skillRoutes = require("./src/routes/SkillRoutes")
app.use("/skill",skillRoutes)

const candidateskillRoutes = require("./src/routes/CandidateSkillRoutes")
app.use("/candidateskill",candidateskillRoutes)

const jobSkillRoutes = require("./src/routes/JobSkillRoutes")
app.use("/jobskill",jobSkillRoutes)

const workerRoutes = require("./src/routes/WorkerRoutes")
app.use("/worker",workerRoutes)

const employerRoutes = require("./src/routes/EmployerRoutes")
app.use("/employer",employerRoutes)

const jobListingRoutes = require("./src/routes/JobListingRoutes")
app.use("/joblisting",jobListingRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected.....")
})

const PORT=4000
app.listen(PORT,()=>{
    console.log("server started on port number",PORT)
})