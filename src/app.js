import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';

const app =  express();
const PORT = 3000;

app.use(express.json());
app.use('/recipes', recipeRoutes);

// for keyword search must have a user / an id which is Emeka or any random name.
// eg http://localhost:3000/user/emma if not done this way doesn't work

app.get('/user{/:id}', (req, res) => {
 const userId = req.params.id || "Keyword doesn't exist";
 res.send(`keyword search is  ${userId}`);
});

 
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});