import axios from 'axios'


export default {
    get: async () => {
        return axios.get(`http://localhost:3001/boards`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
    }
}