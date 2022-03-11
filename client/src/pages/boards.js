import React from "react";
import {useState, useEffect} from 'react';
import api from '../api'
import './style.css'
import jwtDecode from "jwt-decode";
import {Button} from 'react-bootstrap'
import LogoutButton from "../components/logoutButton";

export default function ShowBoards(){

    const [boards, setBoards] = useState([{}])
    const [hasToken, setToken] = useState('')
    
    useEffect(() => {
        api.board.get().then(res => {
            setBoards(res.data)
        })
    }, [])

    useEffect(() => {
        
        const token = window.localStorage.getItem('token')
        if(token){
            
            const decoded = jwtDecode(token)
            if (Date.now() >= decoded.exp * 1000) {
                localStorage.clear();
                return;
              }
              
            setToken(decoded)
        }
    }, [])

    

    return(
        <> 
        {hasToken && <LogoutButton />}
            <h1 className="title">Boards</h1> 
                <table>
                    <tbody>
                    <tr>
                        <th>
                            Boards available
                        </th>
                    </tr>
                        {boards && boards.map((item) => {
                            if(item.name){
                            return(
                            <tr>
                                <Button className="boardlink" href={item.link}>
                                    {item.name}
                                </Button>
                                <td className="boarddesc">{item.description}</td>
                            </tr>
                            )
                        } else {
                            return (
                                <div className="loading-txt">Loading...</div>
                            )
                        }
                    }
                        )}
                    
                    </tbody>
                </table>
                {!hasToken && <><Button className="signup-btn" href="/signup">Sign up</Button><div><Button href="/login" className="login-btn">Login</Button></div></>}
        </>
    )
}