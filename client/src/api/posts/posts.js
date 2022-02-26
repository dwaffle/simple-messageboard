import axios from 'axios'


export default {
    get: async (boardId) => {
        console.log(boardId)
        return axios.get(`http://localhost:3001/posts/${boardId}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
    }
}