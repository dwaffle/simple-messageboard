const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const tokens = require('./models/token')
const authenticateToken = require('./middleware/authenticator')
require('dotenv').config()



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.use(cors())
app.use(bodyParser.json())
var mysql = require('mysql2')
const { JsonWebTokenError } = require('jsonwebtoken')
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
    connection.query(`SELECT p.id, subject, text, date, user_id, board_id, isDeleted, u.username FROM post p JOIN user u ON p.user_id = u.id WHERE board_id = ${req.params.boardId}`, function(err, results, fields){
        if(err){
            throw err
        } else {
            res.status(200).send(results)
        }
    })
})

app.post("/signup", async (req, res) => {
    const body = req.body
    if(!(body.username && body.password)){
            res.status(406).send({
                error: 406,
                message: "Malformed request"
            })
        } else {
            let password = await bcrypt.hash(body.password, 5)
            connection.query(`INSERT INTO user VALUES (default, ?, ?, 0, 0)`, [body.username, password], function(err, results, fields){
                if(err){
                    throw err
                } else {
                    res.status(200).send()
                }
            })
        }
})

app.post("/login", (req, res) => {
    const body = req.body
    if(!(body.username || body.password)){
        res.status(406).send({
            error: 406,
            message: "Malformed request"
        })
    } else {
        connection.query(`SELECT * FROM user WHERE username = ?`, [body.username], async function(err, results, fields){
            
            if(err){
                throw err
            } else {
                if(!results[0]){
                    res.status(401).send(
                        {
                            error: 401,
                            message: "Username or password was incorrect."
                        }
                    )
                    return;
                }
                const validPassword = await bcrypt.compare(body.password, results[0].password)
                
                if(validPassword){
                    res.status(200).send({
                        token: tokens.TokenModel.generateAccessToken({
                            username: body.username,
                            context: {
                                isBanned: results[0].isBanned,
                                isModerator: results[0].isModerator
                            }
                        }),
                        message: "Success"
                    })
                } else {
                    res.status(401).send({
                        error: 401,
                        message: "Username or password was incorrect"
                    })
                }
            }
        })
    }
})

app.post("/posts", authenticateToken.authenticateToken, (req, res) => {
    const post = req.body
    connection.query('SELECT * FROM user WHERE username = ?', [post.username], async function(err, results, fields){
        if(err){
            throw err
        } else {
            connection.query('INSERT INTO post VALUES (default, ?, ?, now(), ?, ?, default)', [post.subject, post.body, results[0].id, post.board], async function (err){
                if(err){
                    throw err
                } else {
                    res.status(201).send({
                        message: "Created"
                    })
                }
            })
        }
    })
})

app.patch("/posts", authenticateToken.authenticateToken, (req, res) => {
    const post = req.body
    connection.query('UPDATE post SET isDeleted = 1 WHERE id = ?', [req.body.id], function(err){
        if(err){
            throw err
        } else {
            res.status(200).send({
                message: "Deleted"
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
