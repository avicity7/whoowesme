const express = require('express')

const bodyParser = require('body-parser')
const { Pool } = require('pg')
const cors = require('cors')
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
app.use(cors())

app.get('/records', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM records ORDER BY record_id DESC')
    let sum = 0
    result.rows.map((item) => {
      sum += parseFloat(item.amount)
    })
    const results = { 'results': (result) ? result.rows : null , 'sum': parseFloat(sum.toFixed(2))}
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
    const {title, lender_email, borrower_email, amount, outstanding} = req.body
    const query = 'INSERT INTO records(title, lender_email, borrower_email, amount, outstanding) VALUES ($1, $2, $3, $4, $5)'
    const values = [title, lender_email, borrower_email, amount, outstanding]
    const result = await client.query(query, values)
    const results = { 'results': (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send("Error " + err)
  }
})

app.put('/records', async (req,res) => {
  try {
    const client = await pool.connect()
    const {record_id, title, amount} = req.body
    const query = 'UPDATE records SET title = $2, amount = $3 WHERE record_id = $1'
    const values = [record_id, title, amount]
    const result = await client.query(query, values)
    const results = { 'results': (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send("Error " + err)
  }
})

app.delete('/records', async (req,res) => {
  try {
    const client = await pool.connect()
    const {id} = req.body
    const query = 'DELETE FROM records WHERE record_id = $1'
    const values = [id]
    const result = await client.query(query, values)
    const results = { 'results': (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send("Error " + err)
  }
})

app.listen(port, ()=>{
  console.log(`Running on Port ${port}`)});

