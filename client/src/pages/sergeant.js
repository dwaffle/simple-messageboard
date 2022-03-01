import React from "react";
import {useState, useEffect} from 'react';
import api from '../api'
import './style.css'
import {Button, Row, Col} from 'react-bootstrap'
import PostingForm from "../components/postForm";

export default function SergeantBoard(){

    const [posts, setPosts] = useState([{}])
    
    useEffect(() => {
        api.posts.get(2).then(res => {
            //Alter the date to a human readable format.
            
            setPosts(res.data)
            console.log(res.data)

        })
    }, [])

    const [hasToken, setToken] = useState('')
    
    useEffect(() => {
        setToken(window.localStorage.getItem('token'))
    }, [])
    

    return(
        <> 
        <Row>
            <h1 className="title">Sergeant Discussion</h1>
        </Row>
                        {posts && posts.map((item) => {
                            return(
                            <>
                            <Col>
                                <div className="subject">Subject: {item.subject}</div>
                            </Col>
                            <Col>
                                <div className="text-header">Text:</div>
                                <div className="body">{item.text}</div>
                            </Col>
                            <div />
                            </>
                            )
                        })}
                <Col>
                        {hasToken && <PostingForm props={{board: 2}} />}
              </Col>  
                
        </>
    )
}