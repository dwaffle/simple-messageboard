import axios from 'axios'


export default {
    post: async (body) => {
        axios.post(`http://localhost:3001/login`, body).then((res) => {
            try{
                window.localStorage.setItem('token', res.data.token)
            } catch {
                alert("An error occured.")
            }
        })
    }
}