import React from "react";
import {useState, useEffect} from 'react';
import {LoginForm} from '../components/loginForm'
import api from '../api'
import './style.css'
import {Button, Row, Col} from 'react-bootstrap'

export default function LoginPage(){

    

    return(
        <> 
            <LoginForm />  
        </>
    )
}