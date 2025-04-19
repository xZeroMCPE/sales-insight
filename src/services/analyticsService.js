export function computeInsights(data) {
    const categoryTotals = {};
    let totalSales = 0;

    for (const sale of data) {
        const { category, amount } = sale;
        if (!categoryTotals[category]) categoryTotals[category] = 0;
        categoryTotals[category] += amount;
        totalSales += amount;
    }

    const bestCategory = Object.entries(categoryTotals).reduce((a, b) => b[1] > a[1] ? b : a)[0];

    return {
        totalSales: totalSales.toFixed(2),
        averageSale: (totalSales / data.length).toFixed(2),
        totalByCategory: categoryTotals,
        bestCategory
    };
}
