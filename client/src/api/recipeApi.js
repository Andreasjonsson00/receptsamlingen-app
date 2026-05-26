import apiClient from "./axiosConfig";
//Get all recipes
export const getAll=async()=>{
    try{
        const result=await apiClient.get('/recipes')
        return result.data;
    }
    catch(error){
        throw new Error(`Failed to fetch recipes: ${error.message}`, {cause: error})
    }
}

export const getById=async(id)=>{
    try{
        const result=await apiClient.get(`/recipes/${id}`)
        return result.data
    }
    catch(error){
        throw new Error(`Failed to fetch recipe ${id}: ${error.message}`, {cause: error})
    }
}

export const add=async(data)=>{
    try{
        const res=await apiClient.post('/create',data)
        return res.data
    }
    catch(error){
        throw new Error(`Failed to add recipe: ${error.message}`, {cause: error})
    }
}

export const update = async (id, data) => {
  try {
    const res = await apiClient.put(`/recipes/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to edit recipe: ${error.message}`, {cause: error});
  }
};


export const remove=async(id)=>{
    try{
        const res=await apiClient.delete(`recipes/${id}`)
        return res.data
    }
    catch(error){
        throw new Error(`Failed to delete recipe: ${error.message}`, {cause: error});
    }
  
}
