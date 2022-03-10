/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'


export default {
    post: async (body) => {
        axios.post(`https://messageboard-512.herokuapp.com/login`, body).then((res) => {
            try{
                window.localStorage.setItem('token', res.data.token)
            } catch {
                alert("An error occured.")
            }
        })
    }
}