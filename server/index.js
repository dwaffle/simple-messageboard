const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
require('dotenv').config()



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.use(cors())
var mysql = require('mysql2')
const { config } = require('dotenv')
var connection = mysql.createConnection({
    host: process.env.WEBHOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
connection.connect()


app.get("/api", (req, res) => {
    res.json({message: "Hello from server!"})
})

app.get("/user", (req, res) => {
    connection.query('SELECT * FROM user', function(err, results, fields){
        if(err){
            throw err
        } else {
            console.log(results);
            res.status(200).send(results);
        }
    })
})

app.get("/boards", (req, res) => {
    connection.query('SELECT * FROM board', function(err, results, fields){
        if(err){
            throw err
        } else {
            console.log(results);
            res.status(200).send(results)
        }
    })
})

app.get("/posts/:boardId", (req, res) => {
    const articleId = req.params.boardId
    connection.query(`SELECT * FROM post WHERE board_id = ${req.params.boardId}`, function(err, results, fields){
        if(err){
            throw err
        } else {
            res.status(200).send(results)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

