/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export default {
    get: async () => {
        return axios.get(`https://messageboard-512.herokuapp.com/user`)
    },

    post: async(body) => {
        return axios.post(`https://messageboard-512.herokuapp.com/user`, body, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
    }
}