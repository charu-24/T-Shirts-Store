import React from 'react'
import Menu from "./Menu"

const Base = ({
    title="My Title",
    description="My description",
    className="bg-dark text-white p-4",
    children
})  => (
    
    <div>
        <Menu />
        <div className="container-fluid p-4">
            <div className="jumbbotron bg-dark text-white text-center">
                <h2 className="display-4 p-2">{title}</h2>
                <p className="lead-2 p-(-0)">{description}</p>
            
            </div>
            <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-2">
            <div className="container-fluid bg-success text-white text-center p-3">
                <h6>If u got any questions feel free to reach out..</h6>
                <button className="btn  btn-warning p-2">Contact Us</button>
            
            </div>
            <div className="container">
                <span className="text-muted">
                    An amazing site to buy tshirts..
                </span>
            </div>        
        </footer>
    </div>
)

export default Base