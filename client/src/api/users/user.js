import axios from 'axios'

export default {
    get: async () => {
        return axios.get(`http://localhost:3001/user`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
    },

    post: async(body) => {
        return axios.post(`http://localhost:3001/user`, body)
    }
}