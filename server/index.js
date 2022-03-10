const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const path = require('path')
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
var pool = mysql.createPool({
    connectionLimit: 0,
    host: process.env.WEBHOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    queueLimit: 0
})

app.get("/test", (req, res) => {
    res.send("Test successful")
})



app.get("/user", (req, res) => {
    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM user', function(err, results, fields){
            if(err){
                res.status.send(err)
            } else {
                res.status(200).send(results);
            }
        })
        connection.release()
    })
})

app.post("/user", authenticateToken.authenticateToken, (req, res) => {
    pool.getConnection(function(err, connection){
        connection.query('UPDATE user SET isBanned = 1, isModerator = 0 WHERE username = ? ', [req.body.username], function(err, results, fields){
            if(err){
                res.status(400).send(err)
            } else {
                res.status(200).send({message: "Banned"})
            }
        })
    })
})

app.get("/boards", (req, res) => {
    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM board', function(err, results, fields){
            if(err){
                res.status(400).send(err)
            } else {
                console.log(results);
                res.status(200).send(results)
            }
        })
        connection.release()
    })
})

app.get("/posts/:boardId", (req, res) => {
    pool.getConnection(function(err, connection){
        connection.query(`SELECT p.id, subject, text, date, user_id, board_id, isDeleted, u.username FROM post p JOIN user u ON p.user_id = u.id WHERE board_id = ${req.params.boardId}`, function(err, results, fields){
            if(err){
                res.status(400).send(err)
            } else {
                res.status(200).send(results)
            }
        })
        connection.release()
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
            pool.getConnection(function(err, connection){
                connection.query(`INSERT INTO user VALUES (default, ?, ?, 0, 0)`, [body.username, password], function(err, results, fields){
                    if(err){
                        res.status(400).send(err)
                    } else {
                        res.status(200).send()
                    }
                })
                connection.release()
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
        pool.getConnection(function(err, connection){
            connection.query(`SELECT * FROM user WHERE username = ?`, [body.username], async function(err, results, fields){
                
                if(err){
                    res.status(400).send(err)
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
            connection.release()
        })
    }
})

app.post("/posts", authenticateToken.authenticateToken, (req, res) => {
    const post = req.body
    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM user WHERE username = ?', [post.username], async function(err, results, fields){
            if(err){
                res.status.send(500)
            } else {
                connection.query('INSERT INTO post VALUES (default, ?, ?, now(), ?, ?, default)', [post.subject, post.body, results[0].id, post.board], async function (err){
                    if(err){
                        res.status(400).send(err)
                    } else {
                        res.status(201).send({
                            message: "Created"
                        })
                    }
                })
            }
        })
        connection.release()
    })
})

app.patch("/posts", authenticateToken.authenticateToken, (req, res) => {
    pool.getConnection(function(err, connection){
        connection.query('UPDATE post SET isDeleted = 1 WHERE id = ?', [req.body.id], function(err){
            if(err){
                res.status(400).send(err)
            } else {
                res.status(200).send({
                    message: "Deleted"
                })
            }
        })
        connection.release()
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
