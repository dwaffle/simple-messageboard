import axios from 'axios'


export default {
    get: async (boardId) => {
        return axios.get(`http://localhost:3001/posts/${boardId}`)
    },
    
    post: async (post) => {
        axios.post(`http://localhost:3001/posts/`, post, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
    },

    patch: async (post) => {
        console.log(post, " Post at API")
        axios.patch(`http://localhost:3001/posts/`, post, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
        })
    }
}