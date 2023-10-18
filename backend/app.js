const express = require('express')
const https = require("https")
const fs = require('fs')
const bodyParser = require('body-parser')
const { Pool } = require('pg')
require('dotenv').config()

const app = express()
const port = 3000

const pool = new Pool({
  user: process.env.NEON_USER,
  host: process.env.NEON_HOST,
  database: process.env.NEON_DB,
  password: process.env.NEON_PASSWORD,
  port: 5432,
  ssl: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/records', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM records')
    const results = { 'results': (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send("Error " + err)
  }
})

app.post('/records', async (req, res) => {
  try {
    const client = await pool.connect()
    const query = 'INSERT INTO records(title, lender_user_id, borrower_user_id, amount, outstanding) VALUES ($1, $2, $3, $4, $5)'
    const values = []
    const result = await client.query(query, values)
    const results = { 'results': (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send("Error " + err)
  }
})

https
  .createServer(app)
  .listen(port, ()=>{
    console.log(`Running on Port ${port}`)
  });