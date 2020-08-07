import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { getAllCategory, deleteCategory } from './helper/adminapicall'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'


const ManageCategories = () => {

    const [categories, setCategories] = useState([])

    const [error, setError] = useState()

    const { user, token } = isAutheticated()

    const preload = () =>{
        getAllCategory().then(data => {
            console.log(data)
            if(error) {
                setError(data.error)
            }else{
                console.log(data)
                setCategories(data)
                
            }
        })
      }

    useEffect(() => {
        preload()
    }, [])

    //delete product
    const deleteThisCategory = productId => {
      deleteCategory(productId, user._id, token).then(data =>{
        
        if(error){
          console.log(data.error)
        }else{
          console.log(data)
         preload()
        }
      })
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

         {categories && categories.map((category, index) =>(

            <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">{category.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/create/update/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {
                deleteThisCategory(category._id)
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
         ))}
        </div>
      </div>
    </Base>
    )
}



export default ManageCategories
