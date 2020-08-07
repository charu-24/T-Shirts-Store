import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { updateThisCategory, getCategory } from './helper/adminapicall'


const UpdateCategory = ({match}) => {
    
    console.log(match)
    const [name, setName] = useState()
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAutheticated()
  
    const preload =(categorytId) =>{
        console.log(match.params.categorytId)
        getCategory(categorytId).then(data => {
            
            if(data.error) {
                setError(data.error)
            }else{
              
               setName(data.name)
                
            }
        })
    }

    useEffect(() => {
        preload(match.params.categorytId)
    }, [])


    const goBack = () => {
        return (
            <div className="mt-5 mb-2">
            <Link to="/admin/dashboard">
            <button className="btn btn-success">Admin Home</button>
        </Link>
            </div>
        )
    }

    const handleChange = (event) => {
        
            setError("");
            setName(event.target.value)
        
    }

    const onSubmit = (event) =>{
    
            event.preventDefault();
            console.log("hhh",{name})
            if({name}){

            
            setError("");
            setSuccess(false)


            //backend request fired
            updateThisCategory(match.params.categorytId, user._id, token, {name})
            .then(data => {
                if(error) {
                    console.log("error part")
                    setError(error)
                }else{
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })
        }
        
    }

    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-12">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                <h4>Your Category has been successfully added</h4>
              </div>
            </div>
          </div>
        );
      };

    const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-12">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                <h4>Failed to create the category</h4>
              </div>
            </div>
          </div>
        );
      };

    const myCategoryForm = () =>{
        return (
            <form>
                <div className="form-group">
                    <p className="lead ">Update the Category</p>
                    <input type="text" className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus placeholder="For Ex. Summer"
                    required
                     />
                    <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
                </div>
            </form>
        )
    }

    return (
        <Base title="Create Category Here" description="Add Categories for your tshirts" className="container bg-info p-4">
            
               <div className="row bg-white rounded mx-3">
                    <div className="col-8 offset-md-2 ">
                    {successMessage()}
                    {errorMessage()}
                    {myCategoryForm()}
                    {goBack()}
                    </div>
                    
               </div>
               
        </Base>
    )
}


export default UpdateCategory