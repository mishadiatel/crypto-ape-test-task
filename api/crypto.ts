export const fetchCryptoData = async (id: string, days: number) => {
    const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
        { next: { revalidate: 3600 } } // cache 1h
    );

    if (!res.ok) throw new Error("Failed to fetch crypto data");

    const data: MarketChartResponse = await res.json();

    return data.prices.map(([timestamp, price]) => {
        const date = new Date(timestamp);
        return {
            time: `${date.getDate()}.${date.getMonth() + 1}`,
            price: parseFloat(price.toFixed(2)),
        };
    });
}