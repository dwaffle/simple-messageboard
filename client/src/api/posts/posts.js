/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'


export default {
    get: async (boardId) => {
        return axios.get(`https://git.heroku.com/messageboard-512posts/${boardId}`)
    },
    
    post: async (post) => {
        axios.post(`https://git.heroku.com/messageboard-512/posts/`, post, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
    },

    patch: async (post) => {
        axios.patch(`https://git.heroku.com/messageboard-512/posts/`, post, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
        })
    }
}