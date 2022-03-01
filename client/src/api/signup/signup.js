import axios from 'axios'

export default {

    post: async(body) => {
        return axios.post(`http://localhost:3001/signup`, body)
    }
}