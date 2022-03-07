import axios from 'axios'

export default {

    post: async(body) => {
        return axios.post(`https://messageboard-256.herokuapp.com/signup`, body)
    }
}