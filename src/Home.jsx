import React from "react";

import { Navigate, useNavigate } from "react-router-dom";
const Home =()=>{
    const navigate = useNavigate();
    const navigateLogin =()=>{
        navigate("/")
    }
    return (
        <>
        <div className="">
        <h1>Welcome to Home Page</h1>
        
        <div>
        <button className="font-bold" onClick={navigateLogin}>LOGOUT</button>
        </div>
        
        </div>
        
        </>

    ) 

    
    
};

export default Home;
