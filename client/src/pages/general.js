import React from "react";
import {useState, useEffect} from 'react';
import api from '../api'
import './style.css'
import {Button, Row, Col} from 'react-bootstrap'
import PostingForm from "../components/postForm";
import jwtDecode from "jwt-decode";
import Post from "../components/post";

export default function GeneralBoard(){

    const [posts, setPosts] = useState([{}])
    const [hasToken, setToken] = useState('')
    
    useEffect(() => {
        api.posts.get(1).then(res => {
            //Alter the date to a human readable format.
            
            setPosts(res.data)

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
            console.log(decoded)
        }
    }, [])

    function handleDelete(post){
        const q = "q"
    }

    

    return(
        <> 
        <Row>
            <h1 className="title">General Discussion</h1>
        </Row>
                        {posts && posts.map((item) => {
                            return(
                            <>
                            <hr></hr>
                                <div className="subject">Subject: {item.subject}</div>
                                <div className="text-header">Text:</div>
                                <div className="body">{item.text}</div>
                                {hasToken.isModerator && <Button variant="warning" className="delete-btn" onClick={handleDelete} >Delete Post</Button>}
                            </>
                            )
                        })}

              <Col>
                        {hasToken ? <PostingForm props={{board: 1}} /> : <><Button href="/signup">Sign up</Button><div><Button href="/login">Login</Button></div></>}
              </Col>  
        </>
    )
}