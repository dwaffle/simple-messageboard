import axios from 'axios'


export default {
    post: async (body) => {
        return axios.post(`http://localhost:3001/login`, body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
    }
}