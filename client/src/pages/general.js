import React from "react";
import {useState, useEffect} from 'react';
import api from '../api'
import './style.css'
import {Button, Row, Col} from 'react-bootstrap'
import PostingForm from "../components/postForm";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/backToBoards";
import LogoutButton from "../components/logoutButton";

export default function GeneralBoard(){

    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])
    const [hasToken, setToken] = useState('')
    
    useEffect(() => {
        api.posts.get(1).then(res => {
            //Alter the date to a human readable format.
            res.data.forEach((post) => {
                post.date = post.date.split('T')[0]
            })
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
        }
    }, [])

         function handleDelete(idno){
             return function deleter(){
                 let id = {
                     id: idno
                 }
                api.posts.patch(id);
                navigate(0)
            }
            
        }

        function handleBan(user){
            return function banner(){
                let username = {
                    username: user
                }
                if(user === hasToken.username){
                    localStorage.clear()
                    navigate('/boards')
                }
                api.user.post(username)
            }
        }
    

    return(
        <> 
            {hasToken && <LogoutButton />} <BackButton /> 
        <Row>
            <h1 className="title">General Discussion</h1> 
        </Row>
                        {posts && posts.map((item) => {
                            if(item.isDeleted === 0){
                            return(
                            <>
                            <hr />
                            <div className="post-wrap">
                                <div className = "user" >Posted by: {item.username} on {item.date} </div>
                                    <div className="subject">Subject: {item.subject}</div>
                                    <br />
                                    <div className="body">{item.text}</div>
                                    {(hasToken && hasToken.context.isModerator && hasToken.context.isBanned !== 1) ? <><Button variant="warning" className="delete-btn" onClick={handleDelete(item.id)} >Delete Post</Button> <Button className="ban-btn" variant="danger" onClick={handleBan(item.username)}>Ban User</Button></> : <div> </div> }
                                </div>
                            </>
                            )
                        } else return (<><hr></hr><div className="deleted-box">[DELETED]</div></>)
                    }
                        )
                    }

              <Col>
                        {(hasToken && (hasToken.context.isBanned !== 1)) ? <PostingForm className="posting-form" props={{board: 1}} /> : (!hasToken) ? <><Button href="/signup">Sign up</Button><div><Button href="/login">Login</Button></div></> : <div>You have been banned from this site.</div>}
              </Col>  
        </>
    )
}