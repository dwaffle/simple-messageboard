import axios from 'axios'

export default {
    get: async () => {
        return axios.get(`http://localhost:3001/user`)
    },

    post: async(body) => {
        return axios.post(`http://localhost:3001/user`, body)
    }
}