import axios from 'axios'


export default {
    get: async () => {
        return axios.get(`https://messageboard-512.herokuapp.com/boards`)
    }
}