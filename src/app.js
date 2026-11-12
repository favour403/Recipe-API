import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';

const app =  express();
const PORT = 3000;

app.use(express.json());
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});