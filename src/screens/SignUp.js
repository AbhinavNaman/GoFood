import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", location:""});

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password:credentials.password, location: credentials.location})
        })
        const json = await response.json()
        console.log(json)


        if(!json.success){
            alert("enter valid credentials")
        }
    }
    
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
      }
      

  return (
    <>
    <h1 style={{padding:"20px"}}>MyFood</h1>
    <hr/>
    <div className="container" style={{marginTop:"40px", width:"50%"}}>
    <h2>Sign Up</h2>
    <br></br>
    <hr/>
    <br></br>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' onChange={onChange} value={credentials.name}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credentials.email} name='email'/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password'/>
  </div>  <div className="mb-3">
    <label htmlFor="name" className="form-label">Location</label>
    <input type="text" className="form-control" name='location' onChange={onChange} value={credentials.location}/>
  </div>
  <button type="submit" className="m-3 btn btn-primary">Submit</button>
  <Link to="/login" className="btn btn-danger">Alredy a user?</Link>
</form>
    </div>
    </>
  )
}
