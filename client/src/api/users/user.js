/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export default {
    get: async () => {
        return axios.get(`https://git.heroku.com/messageboard-512/user`)
    },

    post: async(body) => {
        return axios.post(`https://git.heroku.com/messageboard-512/user`, body, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
    }
}