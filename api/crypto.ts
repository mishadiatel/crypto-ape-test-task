export const fetchCryptoData = async (id: string, days: number): Promise<{time: string;price:number}[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );

    if (!res.ok) throw new Error("Failed to fetch crypto data");

    const data: {
        prices: number[][]
    } = await res.json();

    return data.prices.map(([timestamp, price]) => {
        const date = new Date(timestamp);
        return {
            time: `${date.getDate()}.${date.getMonth() + 1}`,
            price: parseFloat(price.toFixed(2)),
        };
    });
}