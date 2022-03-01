import axios from 'axios'


export default {
    get: async () => {
        return axios.get(`http://localhost:3001/boards`)
    }
}