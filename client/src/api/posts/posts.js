import axios from 'axios'


export default {
    get: async (boardId) => {
        return axios.get(`https://messageboard-256.herokuapp.com/posts/${boardId}`)
    },
    
    post: async (post) => {
        axios.post(`https://messageboard-256.herokuapp.com/posts/`, post, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
    },

    patch: async (post) => {
        axios.patch(`https://messageboard-256.herokuapp.com/posts/`, post, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
        })
    }
}