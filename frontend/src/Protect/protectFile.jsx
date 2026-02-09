import React from "react";
import { Navigate } from "react-router-dom";


export default function Protect({Component}){
let Token = localStorage.getItem("token");

    if(!Token){
return <Navigate to="/login"/>
    }

    return(
        <Component/>
    )
}