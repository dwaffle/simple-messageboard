import axios from 'axios'


export default {
    post: async (body) => {
        axios.post(`https://messageboard-256.herokuapp.com/login`, body).then((res) => {
            try{
                window.localStorage.setItem('token', res.data.token)
            } catch {
                alert("An error occured.")
            }
        })
    }
}