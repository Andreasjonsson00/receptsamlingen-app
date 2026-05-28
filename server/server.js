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

app.post('/create', async (req, res) => {
  const {
    title,
    description,
    image,
    ingredients,
    instructions,
    prep_time,
    cook_time,
    servings,
    category 
  } = req.body;

  console.log('received:', req.body);

  try {
   
    const recipeResult = await pool.query(
      `INSERT INTO recipes (title, description, image, ingredients, instructions, prep_time, cook_time, servings)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id;`,
      [title, description, image, ingredients, instructions, prep_time, cook_time, servings]
    );

    const recipeId = recipeResult.rows[0].id;

    
    if (Array.isArray(category)) {
      for (const catName of category) {
       
        const catResult = await pool.query(
          `SELECT id FROM categories WHERE name = $1;`,
          [catName.trim()]
        );

        if (catResult.rows.length > 0) {
          const categoryId = catResult.rows[0].id;
          await pool.query(
            `INSERT INTO recipes_categories (recipe_id, category_id)
             VALUES ($1, $2)  ON CONFLICT DO NOTHING;`,
            [recipeId, categoryId]
          );
        }
      }
    }

    res.json({ message: 'Recipe added successfully', recipeId });
  } catch (err) {
    console.error(err);
    res.status(400).send('Error adding recipe');
  }
});

//delete recipe
app.delete('/recipes/:id',async(req,res)=>{
  const {id}=req.params
  console.log(id)
  try{
    const result=await pool.query(`DELETE FROM recipes WHERE id=$1 RETURNING*;`,[id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Recipe not found");
     }
    res.json(result.rows[0])
  }
    catch(err){
      console.error(err)
      res.status(500).send('Error deleting recipe')
    }
})

app.put('/recipes/:id/edit', async (req, res) => {
  const { id } = req.params;
  const {
    description,
    image,
    ingredients,
    instructions,
    prep_time,
    cook_time,
    servings,
    category
  } = req.body;

  console.log('received:', req.body);

  try {
    // Uppdatera receptet
    const recipeResult = await pool.query(
      `UPDATE recipes
       SET description=$1, image=$2, ingredients=$3, instructions=$4,
           prep_time=$5, cook_time=$6, servings=$7
       WHERE id=$8
       RETURNING id;`,
      [description, image, ingredients, instructions, prep_time, cook_time, servings, id]
    );

    const recipeId = recipeResult.rows[0].id;

    // Ta bort gamla kategorier först (om du vill uppdatera helt)
    await pool.query(`DELETE FROM recipes_categories WHERE recipe_id=$1;`, [recipeId]);

    // Lägg till nya kategorier
    for (const catName of category) {
      const catResult = await pool.query(
        `SELECT id FROM categories WHERE name = $1;`,
        [catName.trim()]
      );

      if (catResult.rows.length > 0) {
        const categoryId = catResult.rows[0].id;
        await pool.query(
          `INSERT INTO recipes_categories (recipe_id, category_id)
           VALUES ($1, $2);`,
          [recipeId, categoryId]
        );
      }
    }

    res.json({ message: 'Recipe updated successfully', id: recipeId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed updating recipe');
  }
});



app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});