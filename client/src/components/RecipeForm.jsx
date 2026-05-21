import { useState } from "react"
import { Link } from "react-router-dom";

const RecipeForm = ({onSubmit}) => {
 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ingredients: [],
    instructions: [],
    prep_time: null,
    cook_time: null,
    servings: null,
    category: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (type === 'checkbox') {
        if (checked) {
          return { ...prev, category: [...prev.category, name] };
        } else {
          return { ...prev, category: prev.category.filter(c => c !== name) };
        }
      }
      if (name === 'ingredients') {
        return { ...prev, ingredients: value.split(',').map(i => i.trim()) };
      }
      if (name === 'instructions') {
        return { ...prev, instructions: value.split('\n').map(i => i.trim()) };
      }
      if (type === 'number') {
        return { ...prev, [name]: value ? parseInt(value, 10) : null };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData)
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Add recipe title
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </label>
      <br />

      <label htmlFor='description'>Add recipe description
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />

      <label htmlFor='image'>Add recipe image</label>
      <input
        name='image'
        value={formData.image}
        onChange={handleChange}
      />
      <br />

      <label htmlFor='ingredients'>Add recipe ingredients
        <input
          type='text'
          name='ingredients'
          value={formData.ingredients.join(', ')}
          placeholder="Ingredients (comma separated)"
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label htmlFor='instructions'>Add recipe instructions
        <textarea
          name='instructions'
          value={formData.instructions.join('\n')}
          placeholder="Instructions (one instruction per line)"
          onChange={handleChange}
        />
      </label>
      <br />

      <label htmlFor='prep_time'>Add recipe preparation time</label>
      <input
        type='number' min={1}
        name='prep_time'
        value={formData.prep_time ?? ''}
        placeholder="Preparation time in minutes"
        onChange={handleChange}
      />
      <br />

      <label htmlFor='cook_time'>Add recipe cooking time</label>
      <input
        type='number' min={1}
        name='cook_time'
        value={formData.cook_time ?? ''}
        placeholder="Cooking time in minutes"
        onChange={handleChange}
      />
      <br />

      <label htmlFor='servings'>Add recipe servings</label>
      <input
        type='number' min={1}
        name='servings'
        value={formData.servings ?? ''}
        onChange={handleChange}
      />
      <br />

      <span>Add recipe category</span><br />
      <input type="checkbox" id='MainCourse' name='Main Course'
        checked={formData.category.includes('Main Course')}
        onChange={handleChange} />
      <label htmlFor='MainCourse'>Main Course</label>

      <input type="checkbox" id='Starter' name='Starter'
        checked={formData.category.includes('Starter')}
        onChange={handleChange} />
      <label htmlFor='Starter'>Starter</label>

      <input type="checkbox" id='Dessert' name='Dessert'
        checked={formData.category.includes('Dessert')}
        onChange={handleChange} />
      <label htmlFor='Dessert'>Dessert</label>

      <input type="checkbox" id='Vegetarian' name='Vegetarian'
        checked={formData.category.includes('Vegetarian')}
        onChange={handleChange} />
      <label htmlFor='Vegetarian'>Vegetarian</label>

      <input type="checkbox" id='Quick30' name='Quick (<30 min)'
        checked={formData.category.includes('Quick (<30 min)')}
        onChange={handleChange} />
      <label htmlFor='Quick30'>Quick (&lt;30 min)</label>

      <br />
      <button type='submit'>Submit</button>
      <Link to='/'><button>Cancel</button></Link>
    </form>
  );
};

export default RecipeForm;

