import React from "react";
import {useState, useEffect} from 'react';
import api from '../api'
import './style.css'
import {Button} from 'react-bootstrap'

export default function ShowBoards(){

    const [boards, setBoards] = useState([{}])
    
    useEffect(() => {
        api.board.get().then(res => {
            setBoards(res.data)
        })
    }, [])


    

    return(
        <> 
            <h1 className="title">Boards</h1>
                <table>
                    <tbody>
                    <tr>
                        <th>
                            Boards available
                        </th>
                    </tr>
                        {boards && boards.map((item) => {
                            return(
                            <tr>
                                <Button className="boardlink" href={item.link}>
                                    {item.name}
                                </Button>
                                <td className="boarddesc">{item.description}</td>
                            </tr>
                            )
                        })}
                    
                    </tbody>
                </table>
                
        </>
    )
}