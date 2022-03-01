import React from "react";
import {useState, useEffect} from 'react';
import api from '../api'
import { Form, Button, Row, Col } from "react-bootstrap";
import jwt_decode from 'jwt-decode'

export default function PostingForm(props = {}){

    //Get username from the JWT token
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        const decoded = jwt_decode(token)
        setToken(decoded)
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
            api.posts.post(postRequest)
        } 
    }
    
    return(
        <> 
            <Form>
                <Form.Group className="posting-form">
                    <Row>
                        <Row>
                            Posting as {username}
                        </Row>
                    </Row>                    
                    <Row>
                        <Form.Label>Subject:</Form.Label>
                        <Col>
                            <Form.Control placeholder="Subject" onChange={(e) => setSubject(e.target.value)}></Form.Control>
                            <Form.Label>Body</Form.Label>
                            <Col>
                                <Form.Control placeholder="Main text" onChange={(e) => setBody(e.target.value)}></Form.Control>
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