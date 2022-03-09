import axios from 'axios'

export default {

    post: async(body) => {
        return axios.post(`https://git.heroku.com/messageboard-512/signup`, body)
    }
}