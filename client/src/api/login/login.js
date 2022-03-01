import axios from 'axios'


export default {
    post: async (body) => {
        axios.post(`http://localhost:3001/login`, body).then((res) => {
            console.log(res);
            try{
                window.localStorage.setItem('token', res.data.token)
                return res
            } catch {
                alert("An error occured.")
            }
        })
    }
}