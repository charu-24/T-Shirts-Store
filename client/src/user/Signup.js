import React, { useState } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { signup } from "../auth/helper/index"

const Signup = () => {
    
const [values, setValues] = useState({
    firstName:"",
    email: "",
    encry_password:"",
    error:"",
    success: false
})

const { firstName, email, encry_password, error, success} = values

const handleChange = name => event => {
    setValues({...values, error:false, [name]: event.target.value})
}

const onSubmit = event =>{
    event.preventDefault();
    setValues({...values, error:false})
    signup({firstName, email, encry_password})
   
    .then(data => {
        if(data.error){
            setValues({...values, error:data.error, success: false})
            console.log("in error")
        }
        else{
          
            setValues({
                ...values,
                firstName:"",
                email:"",
                encry_password:"",
                error:"",
                success: true
            })
            console.log(values)
            console.log("hey i am in success")
        }
       
       
    })
    .catch((error) => console.log(error))
}

    const signupform = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div 
                        
                        className="form-group"
                        
                        >
                            <label className="text-light">
                                Name
                            </label>
                        <input className="form-control" 
                        onChange = {handleChange("firstName")}
                        type="text"
                        value={firstName}
                        />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input 
                           
                            className="form-control" 
                            onChange = {handleChange("email")}
                            type="email"
                            value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input 
                            
                            className="form-control" 
                            onChange = {handleChange("encry_password")}
                            type="password" 
                            value={encry_password}
                            />
                        </div>
                        <button 
                        onClick={onSubmit}
                        className="btn btn-success btn-block">Signup</button>
                    
                    </form>
                    
                </div>
        
            </div>
        )
}


const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };


    return(
        <Base title="Signup Page" description="Hey Are u not registerd? Get Register now..">
       
            {successMessage()}
            {errorMessage()}
            {signupform()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        
        </Base>
    )
}

export default Signup