import React from "react";
import {Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export default function BackButton(props = {}){
    const navigate = useNavigate()
    function toBoards(){
        navigate('/boards')
    }

    return(
        <>
            <Button variant='primary' onClick={toBoards} className="back-btn">Back to Boards</Button>
        </>
    )
}