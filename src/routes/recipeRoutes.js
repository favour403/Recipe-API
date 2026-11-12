import express from 'express';
import { findRecipes } from '../services/recipeService.js';

const router = express.Router();

//Get /recipes
router.get('/', async (req, res) => {
    try {
        const {ingredient, keyword} = req.query;
        const results = await findRecipes({ingredient, keyword});

        return res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve recipes',
            error: error.message
        });
    }
});

export default router;