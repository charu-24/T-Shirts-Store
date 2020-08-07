import React, { useState, useEffect } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

const CartItem = ({product, addToCart=true, removeFromCart=false, setReload= f => f,
reload=undefined}) => {
    
        const [redirect, setRedirect] = useState(false)

        const [count, setCount] = useState(product.count)

        const addToTheCart = () =>{
            addItemToCart(product, ()=>{
                setRedirect(true)
            })
}

        const getARedirect = (redirect) =>{
            if(redirect){
                return <Redirect to="/cart" />
            }
        }
        const increamentCount = () => {
          console.log(product)
          setCount(count+1)
          product.count = count
          console.log(product)
        }
        const decreamentCount = () =>{
          if (count>1){
          setCount(count-1)}
          product.count=count
        }
        useEffect(() => {
          increamentCount()
      }, [])

        return (
          <div className="card text-white bg-dark  ">
            <div className="row border border-info">
            <div className="col-md-3">
            <ImageHelper product={product} />
            </div>
            <div className="col-md-5 border border-success">
            <div className="card-header lead text-left bg-success mt-1">{product.name}</div>
            <p className="lead font-weight-normal text-wrap mt-3 ml-3">
                  {product.description}
                </p>
                
            </div>
            <div className="col-md-2 text-center border border-success">
            <div className="card-header lead bg-success mt-1">Price</div>
            <p className=" border border-info font-weight-normal text-wrap text-center mt-3">
            Rs {product.price}
          </p></div>
          <div className="col-md-2">
          <div className="card-header lead bg-success mt-1 text-center border border-success ">Quantity</div>
          <p className=" font-weight-normal text-wrap text-center mt-3  ">
          <button className="btn btn-success btn-sm" onClick={() => increamentCount()}>+</button> {product.count} <button className="btn btn-danger btn-sm" onClick={() =>{
            decreamentCount()
          }}>-</button>
            
          </p>
          </div>
            <div className="col-md-12">
            {removeFromCart && (
                <button
                onClick={() => {
                  removeItemFromCart(product._id)
                  setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
              )}
            
            </div>
            </div>
              
            
            </div>
        );
      };    
    

export default CartItem
