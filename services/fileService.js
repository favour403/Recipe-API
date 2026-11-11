 import path from 'path';
 import fs from 'fs/promises';
 import { fileURLToPath } from 'url';
 
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

//    READ RECIPE FUNCTION 
const filePath = path.join(__dirname, '..','data','recipes.json')
  async function readRecipes () {
  try {
     const data = await fs.readFile(filePath);
  return JSON.parse(data)
  }catch (error){
    throw error
  }
  }

    // WRITE RECIPE FUNCTION 
    async function writeRecipes(recipes) {
        try {
        const stringData = JSON.stringify(recipes,null,2);
        await fs.writeFile(filePath,stringData,'utf8')
        }catch (error) {
            throw error
        }
    };
    const data = await readRecipes();
    console.log (data);

    export {readRecipes,writeRecipes}