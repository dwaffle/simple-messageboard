import axios from 'axios'


export default {
    get: async (boardId) => {
        console.log(boardId)
        return axios.get(`http://localhost:3001/posts/${boardId}`)
    },
    
    post: async (post) => {
        axios.post(`http://localhost:3001/posts/`, post)
    }
}