require('dotenv').config()
const express = require("express");
const cors = require("cors");
const {Pool}=require('pg');
const app = express();
app.use(cors());
app.use(express.json());

const pool=new Pool({
   host:process.env.DB_HOST,
   port:process.env.DB_PORT,
   user:process.env.DB_USER,
   database:process.env.DB_DATABASE,
   password:process.env.DB_PASSWORD,
   ssl: { rejectUnauthorized: false }    
});
console.log(pool)

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});



app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});