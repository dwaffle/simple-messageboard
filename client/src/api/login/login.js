/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'


export default {
    post: async (body) => {
        axios.post(`https://git.heroku.com/messageboard-512/login`, body).then((res) => {
            try{
                window.localStorage.setItem('token', res.data.token)
            } catch {
                alert("An error occured.")
            }
        })
    }
}