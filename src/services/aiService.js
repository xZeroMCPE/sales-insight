import axios from 'axios';

export async function generateSummary(analytics) {
    const prompt = `
Use the following sales analytics:
- Total Sales: $${analytics.totalSales}
- Average Sale: $${analytics.averageSale}
- Best Performing Category: ${analytics.bestCategory}

Make a short summary for a business owner.
  `;

    const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a helpful and good sales analyst, that processes sales data for a company' },
            { role: 'user', content: prompt }
        ],
        temperature: 0.7,
    };

    const headers = {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
    };

    let retries = 3;

    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                payload,
                { headers }
            );
            return response.data.choices[0].message.content.trim();
        } catch (error) {
            if (error.response?.status === 429 && i < retries - 1) {
                console.warn(`Rate limited. Retrying in 5 seconds... [Attempt ${i + 1}]`);
                await new Promise(res => setTimeout(res, 5000));
            } else {
                console.error('OpenAI request failed:', error.message);
                throw error;
            }
        }
    }
}
