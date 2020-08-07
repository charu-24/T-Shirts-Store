import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'

import { getAllCategory, createProduct } from './helper/adminapicall'
import { isAutheticated } from '../auth/helper'

const AddProduct=() => {

    const {user, token} = isAutheticated()

    const [values, setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        categories:[],
        category:"",
        createdProduct:"",
        loading:false,
        error:false,
        getaRedirect:false,
        formData:""
        
    })

const { name, description, price, stock, categories,category,createdProduct,loading,error,getaRedirect,formData} = values

    const preload =() =>{
        getAllCategory().then(data => {
            
            if(data.error) {
                setValues({
                    ...values,
                error: data.error
                })
            }else{
              
                setValues({
                    ...values, 
                    categories: data,
                    formData: new FormData()
                })
                console.log(categories)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const onSubmit =event => {
      event.preventDefault()
      setValues({...values, error:"",loading:true})
      createProduct(user._id, token,  formData)
      .then(data =>{
        if(data.error){
          setValues({...values, error:data.error})
        }
        else{
          
          setValues({
            ...values,
            createdProduct:name,
            name:"",
            description:"",
            price:"",
            photo:"",
            stock:"",
            loading:false,
            
            
          })
          

        }
      })
    }

    const handleChange = name => event => {
        const value = name ==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({
            ...values,
            [name] : value
        })
    }


    //successs message
    const successMessage =() =>(

      <div className="alert alert-success mt-3" style={{display: createdProduct ? "" : "None"}}>
      
      <h4>{createdProduct} created successfully</h4>

      
      </div>
    )

    //error message
    const errorMessage =() =>(

      <div className="alert alert-warning mt-3" style={{display: error ? "" : "None"}}>
      
      <h4>{createdProduct} created successfully</h4>

      
      </div>
    )

    //product form
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate, index) =>{
                  return(
                      <option key={index} value={cate._id}>{cate.name}</option>
                  )
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );

    return (
        <Base title="Add Product Here!" description="Welcome to the product Creation section" className="container bg-info p-4 text-white">
           <Link to="/admin/dashboard" className="btn btn-md btn-outline-white btn-dark mb-3">
                Admin Home
           </Link>
           <div className="container bg-dark mx-1 ">
            <div className="col-md-6 offset-sm-3">
            {successMessage()}
            {errorMessage()}
            {createProductForm()}
            </div>
           </div>
        </Base>
    )
}


export default AddProduct