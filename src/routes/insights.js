import express from 'express';
import { computeInsights } from '../services/analyticsService.js';
import { generateSummary } from '../services/aiService.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const sales = req.body;

    if (!Array.isArray(sales) || sales.length === 0) {
        return res.status(400).json({ error: 'Invalid input format' });
    }

    try {
        const analytics = computeInsights(sales);
        const summary = await generateSummary(analytics);
        res.json({ analytics, summary });
    } catch (error) {
        console.error('Error generating insights:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
