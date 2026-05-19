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


app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

//get all rows from recipes
app.get('/recipes',async(req,res)=>{
    try{
          const result=await pool.query(`SELECT r.*, ARRAY_AGG(c.name) as category_name FROM recipes r left join recipes_categories rc on r.id=rc.recipe_id left join categories c on c.id=rc.category_id GROUP BY r.id;`)
        
          res.json(result.rows)
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error fetching recipes');
    }
}
);

//get recipe by id
app.get('/recipes/:id',async(req,res)=>{
    const{id}=req.params
    try{
        const result=await pool.query(`SELECT * FROM recipes WHERE id=$1 ;`,[id]);
        res.json(result.rows[0])
        if(result.rows[0].length===0){
            return res.status(404).send('Recipe not found')
        }
    }
    catch(err){
        console.error(err)
        res.status(500).send('Error fetching recipe')
    }
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});