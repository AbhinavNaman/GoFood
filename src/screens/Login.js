import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'

const Login = () => {

  const [credential, setCredential] = useState({email:"", password:""});
  let navigate = useNavigate();

  const handleSubmit = async (e) =>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/loginuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({email: credential.email, password:credential.password})
      })
      const json = await response.json()
      console.log(json)


      if(!json.success){
          alert("enter valid credentials")
      }
      else{
        localStorage.setItem("userEmail", credential.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        console.log(localStorage.getItem("userEmail"));
        navigate("/");
      }
  }
  
  const onChange = (event) => {
      setCredential({ ...credential, [event.target.name]: event.target.value });
    }
    

  return (
   <>
   <h1 style={{padding:"20px"}}>MyFood</h1>
   <hr/>
   
    <div className="container" style={{marginTop:"80px", width:"50%"}}>
    <h2>Sign In</h2>
    <br></br>
    <hr/>
    <br></br>
      <form onSubmit={handleSubmit} autoComplete="off">

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credential.email} name='email'autoComplete="off"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credential.password} name='password'autoComplete="off"/>
  </div> 
  <button type="submit" className="m-3 btn btn-primary">Submit</button>
  <Link to="/signup" className="btn btn-danger">i am a new user?</Link>
  
</form>
    </div>
   </>
  );
};

export default Login;
