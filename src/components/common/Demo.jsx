import React from 'react'
import { useForm } from 'react-hook-form'

export const Demo = () => {
    const{register,handleSubmit}=useForm()
    const submitHandler=(data)=>{
        console.log(data)
    }
  return (
    <div className="d-flex align-items-center justify-content-center"style={{height:"100vh",width:"100vw"}}>
        <div className='card p-4 shadow'style={{width:"400px",backgroundColor:"white"}}> 
            <div style={{textAlign:'center'}}>
                <h1>Demo</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className='mb-3 d-flex align-items-center'>
                        <label>Name</label>
                        <input type='text' placeholder='Enter Your Name'{...register("name")}></input>
                    </div>
                    <div className='mb-3 d-flex align-items-center'>
                        <label>Password</label>
                        <input type='password' placeholder='Enter Your Password'{...register("password")}></input>
                    </div>
                    <button type='submit'className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    </div>
    )
}
