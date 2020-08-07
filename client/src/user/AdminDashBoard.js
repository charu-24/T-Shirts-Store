import React from 'react'
import Base from "../core/Base"
import { isAutheticated } from '../auth/helper'
import { Link } from 'react-router-dom'


const AdminDashboard =() => {
    const { user : {firstName, email, role,password }} = isAutheticated()
    
    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">Create Ctegories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success">Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success">Create Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/manage/product" className="nav-link text-success">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/manage/order" className="nav-link text-success">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }


    const adminRightSide = () =>{
        return(
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                    <span className="badge badge-success mr-2"> Name:</span> {password}
                    </li>
                    <li className="list-group-item">
                    <span className="badge badge-success mr-2"> Email:</span> {email}
                    </li>

                </ul>
            </div>
        )
    }
    
    return (
       <Base title="Welcome to the Admin Section " description="Manage your Products Here!" className="container bg-success p-4">
            
            <div className="row ">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>

            </div>
            
            

            
       </Base>
    )
}

export default AdminDashboard 