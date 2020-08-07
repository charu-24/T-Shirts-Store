import React, { useState, useEffect } from "react";
import "../styles.css"

import Base from "../core/Base"
import Card from './Card'
import { getProductS } from './helper/coreapicalls'
import { API } from "../backend";


export default function Home() {
    console.log("API IS", API)

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct = () =>{
        getProductS().then(data => {
            
            if(error){
                setError(data.error)
            }
            else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
       loadAllProduct()
    }, [])


    return (

        <Base title="Home page">
            <div className="row text-center">
            <h1 className="text-white">All of Tshirts</h1>
                <p>"hello users"</p>
            </div>
        </Base>
    )
}
