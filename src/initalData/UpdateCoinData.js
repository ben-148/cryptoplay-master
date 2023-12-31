import axios from "axios";

const UpdateCoinData = async () => {
  try {
    // Fetch data from your server
    const serverResponse = await axios.get("/coins");
    const serverData = serverResponse.data;

    // Fetch data from the external API
    const apiResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          locale: "en",
        },
      }
    );
    const apiData = apiResponse.data;

    const updatedData = serverData.map((coinFromServer) => {
      const matchingApiCoin = apiData.find(
        (coinFromApi) =>
          coinFromApi.symbol.toLowerCase() ===
          coinFromServer.codeName.toLowerCase()
      );

      if (matchingApiCoin) {
        return {
          ...coinFromServer,
          price: matchingApiCoin.current_price,
          change24: matchingApiCoin.price_change_percentage_24h,
          market_cap: matchingApiCoin.market_cap,
        };
      }

      return coinFromServer;
    });

    // Update coins on the server if needed
    await axios.patch("/coins/bulk-update", {
      coins: updatedData.map((coinData) => ({
        id: coinData._id,
        price: coinData.price,
        change24: coinData.change24,
        market_cap: coinData.market_cap,
        // Add other fields as needed
      })),
    });
    // console.log("server updated");
  } catch (error) {
    console.error("Error fetching or updating data:", error);
  }
};

export default UpdateCoinData;
