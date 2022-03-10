import React from "react";
import {Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export default function LogoutButton(props = {}){
    const navigate = useNavigate()
    function logout(){
        window.localStorage.clear()
        navigate(0)
    }

    return(
        <>
            <Button variant='warning' onClick={logout} className="logout-btn">Logout</Button>
        </>
    )
}