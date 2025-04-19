import axios from 'axios';

export async function generateSummary(analytics) {
    const prompt = `
Use the following sales analytics:
- Total Sales: $${analytics.totalSales}
- Average Sale: $${analytics.averageSale}
- Best Performing Category: ${analytics.bestCategory}

Make a short summary for a business owner.
`;

    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful and good sales analyst, that processes sales data for a company' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data.choices[0].message.content.trim();
}
