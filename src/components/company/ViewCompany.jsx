import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ViewCompany = () => {

    const [companies, setcompanies] = useState([])
    const getAllMyCompanies = async() => {

        const res = await axios.get("/company/getcompanybyuserid/"+localStorage.getItem("id"))
        console.log(res.data) //api response...
        setscreens(res.data.data)

    }

    useEffect(() => {
        
        getAllMyCompanies()
        
    }, [])
    

  return (
    <div style={{textAlign:"center"}}>
        MY Companies
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th>COMPANY</th>
                    <th>IMAGE</th>
                </tr>
            </thead>
            <tbody>
                {
                   companies?.map((sc)=>{
                    return<tr>
                        <td>{sc.com}</td>
                        <td>
                            <img  style ={{height:100,width:100}}src={sc?.hordingURL}></img>
                        </td>
                    </tr>
                   }) 
                }
            </tbody>
        </table>
    </div>
  )
}