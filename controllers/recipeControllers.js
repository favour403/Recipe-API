export const validateRecipe = (req,res,next) => {
    if(
    !req.body ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
 ){
    return res.status(400).json({
        error:"Request body must be a valid Json"
    })
 }
    const { name, ingredients, instructions, timeToPrepare } = req.body;

if (
    typeof name !== 'string' ||
    name.trim() === ""
) {
    return res.status(400).json({ error: 'Name is required' });
}


//Check ingredients and instructions
 if (!Array.isArray(ingredients) ||
    ingredients.length === 0 ||
    !ingredients.every(
    ingredient => typeof ingredient === 'string' && ingredient.trim() !== "")) {
    return res.status(400).json({ error: 'Ingredients must be a non-empty array' });
}
 if(
    typeof instructions !== 'string' ||
    instructions.trim() === ""
 ) {
    return res.status(400).json({ error: 'Recipe Instructions are required' });
}

// check preparation time
if (
    typeof timeToPrepare !== 'number' ||
    !Number.isFinite(timeToPrepare) ||
    timeToPrepare <= 0
){
    return res.status(400).json({
        error:"Preparation time must be a positive number and must be in minutes"
    })

}

// All checks passed, proceed to the next middleware or route handler
console.log("Recipe validation passed");
next();
}