/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export default {

    post: async(body) => {
        return axios.post(`https://messageboard-512.herokuapp.com/signup`, body)
    }
}