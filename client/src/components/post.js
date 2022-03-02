import React from "react";

export default function Post(props = {}){


    return(
        <>
            <div className="subject">Subject: {props.subject}</div>
            <div className="text-header">Text:</div>
            <div className="body">{props.text}</div>
        </>
    )
}