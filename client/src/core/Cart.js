import React, { useState, useEffect } from "react";
import "../styles.css"
import { API } from "../backend1"
import Base from "../core/Base"
import Card from './Card'
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import CartItem from "./CartItem";



const Cart=() => {
    console.log("API IS", API)
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)
   
    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return(
            <div>
                <h2 >Shpping Cart</h2>
                {products.map((product, index) =>{
                    return(
                        <CartItem
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addToCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () =>{
        return(
            <div>
                <h2><StripeCheckout 
                 products={products}
                 setReload={setReload}
                 reload={reload}
                /></h2>
            </div>
        )
    }
    
    return (

        <Base title="Cart page">
            <div className="row ">
                <div className="col-md-12 ">
                    {
                        products.length ? loadAllProducts(products):(<h3>No products here</h3>)
                    }
                </div>
              
            </div>
        </Base>
    )
}

export default Cart