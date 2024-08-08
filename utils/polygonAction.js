// https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=Z1eoon688hHr9jLDjEKVL2UroOU8XHPK
const apiKey = process.env.NEXT_PUBLIC_POLY_API_KEY;
const basePath = "https://api.polygon.io/v2/aggs/ticker";

//Get the date for today and seven days ago
const getDates = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDate = (date) => date.toISOString().split("T")[0];

  return {
    today: formatDate(today),
    sevenDaysAgo: formatDate(sevenDaysAgo),
  };
};

export const fetchHistoricalDataPolygon = async (stockSymbol) => {
  const { today, sevenDaysAgo } = getDates();
  const url = `${basePath}/${stockSymbol}/range/1/day/${sevenDaysAgo}/${today}?apiKey=${apiKey}`;

  console.log("Fetching from polygon ai 🍇: " + url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching historical data for ${stockSymbol}:`, error);
    return null;
  }
};
