import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UserSidebar } from './components/layouts/UserSidebar'
//import './App.css'
// import "./assets/adminlte.css"
// import "./assets/adminlte.min.css"
import { Route, Routes } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import { Demo } from './components/common/Demo'
import axios from 'axios'
import { StudentsProfile } from './components/user/StudentsProfile'
import { AdminSignup } from './components/common/AdminSignup'
import { EmployeeSignup } from './components/common/EmployeeSignup'
import { WorkerSignup } from './components/common/WorkerSignup'
import { AdminProfle } from './components/user/AdminProfle'
import { WorkerProfile } from './components/user/WorkerProfile'
import { EmployeeProfile } from './components/user/EmployeeProfile'
import { CompanySidebar } from './components/layouts/CompanySidebar'
import { AddCompany } from './components/company/AddCompany'
import LandingPage from './components/common/LandingPage'
import { ContactUs } from './components/common/ContactUs'
import AboutUs from './components/common/AboutUs'
import EmployerDashboard from './components/employer/EmployerDashboard'
import  WorkerDashboard  from './components/worker/WorkerDashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import {Apply} from './components/worker/Apply'
import { Login1 } from './components/common/Login1'


function App() {
  axios.defaults.baseURL="http://localhost:4000"

  return (
    <body class="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
      <div class="app-wrapper">
       <Routes>
        <Route path='/'element={<LandingPage/>}></Route>
        <Route path='/contact'element={<ContactUs/>}></Route> 
        <Route path='/admindashboard'element={<AdminDashboard/>}></Route>
        <Route path='/employerdashboard'element={<EmployerDashboard/>}></Route>
        <Route path='/workerdashboard'element={<WorkerDashboard/>}></Route>
        <Route path='/apply'element={<Apply/>}></Route>
        <Route path='/about-us'element={<AboutUs/>}></Route> 
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/login1' element={<Login1/>}></Route>
        <Route path='/signup'element={<Signup/>}></Route>
        <Route path='/adminsignup'element={<AdminSignup/>}></Route>
        <Route path='/employeesignup'element={<EmployeeSignup/>}></Route>
        <Route path='/workersignup'element={<WorkerSignup/>}></Route>
        <Route path='/demo'element={<Demo/>}></Route>
        <Route path='/user'element={<UserSidebar/>}>
          <Route path='profile'element={<UserProfile/>}></Route>
        </Route>
        <Route path='/company'element={<CompanySidebar/>}>
          <Route path='addcompany'element={<AddCompany/>}></Route>
        </Route>
        <Route path='/students'element={<StudentsProfile/>}></Route>
        <Route path='/adminprofile' element={<AdminProfle/>}></Route>
        <Route path='/workerprofile' element={<WorkerProfile/>}></Route>
        <Route path='/employeeprofile' element={<EmployeeProfile/>}></Route>
        
       </Routes>
      </div>
    </body>
  )
}


export default App
