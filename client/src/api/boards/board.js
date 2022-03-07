import axios from 'axios'


export default {
    get: async () => {
        return axios.get(`https://messageboard-256.herokuapp.com/boards`)
    }
}