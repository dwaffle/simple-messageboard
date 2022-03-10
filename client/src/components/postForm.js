import React from "react";
import {useState, useEffect} from 'react';
import api from '../api'
import { Form, Button, Row, Col } from "react-bootstrap";
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

export default function PostingForm(props = {}){
    const navigate = useNavigate()
    //Get username from the JWT token
    const [username, setUsername] = useState('')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        const decoded = jwt_decode(token)
        setUsername(decoded.username)
    }, [])
    //Submission handler function.
    function handlePost(e) {
        e.preventDefault();
        const postRequest = { 
            board: props.props.board,
            username: username,
            subject: subject,
            body: body
        };
        if(!subject || !body){
            alert("You must have a subject and a body to post.")
        } else {
            try {
                api.posts.post(postRequest)
                navigate(0);
            } catch {
                alert("Please log in again")
            }
        } 
    }
    
    return(
        <> 
            <Form className="posting-form">
                <Form.Group >
                    <Row>
                            Posting as {username}
                    </Row>                    
                    <Row>
                        <Form.Label>Subject:</Form.Label>
                        <Col>
                            <textarea className="subject-form" placeholder="Subject" onChange={(e) => setSubject(e.target.value)}></textarea>
                            <Form.Label>Body</Form.Label>
                            <Col>
                                <textarea className="maintext-form" placeholder="Main text" onChange={(e) => setBody(e.target.value)}></textarea>
                            </Col>
                        </Col>
                    </Row>
                </Form.Group> 

                <Button
            className="btn btn-primary btn-block"
            variant="primary"
            type="submit"
            onClick={handlePost}
          >
            Submit
          </Button>
            </Form>
        </>
    )
}