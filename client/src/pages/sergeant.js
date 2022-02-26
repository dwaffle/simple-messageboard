import React from "react";
import {useState, useEffect} from 'react';
import api from '../api'
import './style.css'
import {Button} from 'react-bootstrap'
import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu";

export default function GeneralBoard(){

    const [posts, setPosts] = useState([{}])
    
    useEffect(() => {
        api.posts.get(2).then(res => {
            //Alter the date to a human readable format.
            
            setPosts(res.data)
            console.log(res.data)

        })
    }, [])
    

    return(
        <> 
            <h1 className="title">Boards</h1>
                <table>
                    <tbody>
                    <tr>
                        <th>
                            General Discussion
                        </th>
                    </tr>
                        {posts && posts.map((item) => {
                            return(
                            <tr>
                                <tr>Subject</tr>
                                <td>{item.subject}</td>
                                <tr>Posted on {item.date}</tr>
                                <tr>Body</tr>
                                <td>{item.text}</td>
                            </tr>
                            )
                        })}
                    
                    </tbody>
                </table>
                
        </>
    )
}