import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadCart, cartEmpty } from './helper/cartHelper'
import { isAutheticated } from '../auth/helper'


const StripeCheckout = ({products, setReload = f => f, reload= undefined}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error:"",
        address: ""
    })


    const token = isAutheticated() && isAutheticated().token
    const userId = isAutheticated() && isAutheticated().user._id

    const getPrice = () => {
        let amount=0
        products.map(p => {
            amount= amount + p.price
        })
        return amount
    }

    const showStripeButton = () =>{
        return isAutheticated() ? (
            <button className="btn btn-success ">Pay With Stripe</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-danger">Signin</button>
            </Link>
        )
    }

    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout
