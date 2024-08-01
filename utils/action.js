"use server";
import OpenAI from "openai";
import prisma from "./db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0, // More Precise Response = 0, Diverse Creative Response = 1
    });
    console.log(response.choices[0].message);
    return response.choices[0].message;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// https://platform.openai.com/docs/quickstart?context=node

export const generateStockResponse = async (userQuery) => {
  console.log("Received Query: 🤨🤨🤨🤨" + userQuery);
  const finalQuery = `
    ${userQuery.selectedQuery} 
    If the stock does not exist in ${userQuery.country}, include the country where it is found in the description.
    
    Once you have a list, generate a response. The response should be in the following JSON format: 
    {
      "stockGeneratedData": {
        "stock": "${userQuery.stock}",
        "country": "${userQuery.country}",
        "title": "Title for ${userQuery.stock} in ${userQuery.country}",
        "description": "Generate the query results here. Keep it to less than 40 words."
      }
    }

    If ${userQuery.stock} or ${userQuery.country} does not exist, return { "stockGeneratedData": null } with no additional characters.
    `;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a stock checker and assistant.",
        },
        { role: "user", content: finalQuery },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    console.log(response.choices[0].message);
    const stockData = JSON.parse(response.choices[0].message.content);
    return stockData.stockGeneratedData;
  } catch (error) {
    console.error("Error generating stock response:", error);
    return null;
  }
};

export const getExistingStockQuery = async ({ stock, country, userId }) => {
  if (!userId) {
    throw new Error("User ID is required to fetch the stock data.");
  }

  return prisma.stockAIModel.findUnique({
    where: {
      stock_country_userId: {
        stock,
        country,
        userId,
      },
    },
  });
};

export const createNewStockQuery = async (stock, userId) => {
  return prisma.stockAIModel.create({
    data: {
      ...stock,
      userId,
    },
  });
};

export const getAllStockQuery = async (userId, searchInput) => {
  if (!userId) {
    throw new Error("User ID is required to fetch the stock data.");
  }

  // If no search input, return all stocks for the user
  if (!searchInput) {
    const aiQueries = await prisma.stockAIModel.findMany({
      where: {
        userId,
      },
      orderBy: {
        stock: "asc",
      },
    });
    return aiQueries;
  }

  const aiQueries = await prisma.stockAIModel.findMany({
    where: {
      userId,
      OR: [
        {
          stock: {
            contains: searchInput,
          },
        },
        {
          country: {
            contains: searchInput,
          },
        },
      ],
    },
    orderBy: {
      stock: "asc",
    },
  });
  return aiQueries;
};

export const getSingleStockQuery = async (id, userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch the stock data.");
  }

  return prisma.stockAIModel.findUnique({
    where: {
      id,
      userId,
    },
  });
};

// Users action, stock query.
export const createOrUpdateStockInput = async (stock, userId) => {
  const { stockTicker, amount, price } = stock;

  try {
    // Check if the stock exists for the user
    const existingStock = await prisma.stockModel.findUnique({
      where: {
        stockTicker_userId: {
          stockTicker,
          userId,
        },
      },
    });

    if (existingStock) {
      // Stock exists: update the amount, price, and total value
      const newAmount = existingStock.amount + amount;
      const newTotalValue = existingStock.totalValue + price * amount;
      const newPrice = newTotalValue / newAmount;

      return await prisma.stockModel.update({
        where: {
          id: existingStock.id,
        },
        data: {
          amount: newAmount,
          price: newPrice,
          totalValue: newTotalValue,
        },
      });
    } else {
      // Stock does not exist: create a new stock entry
      const totalValue = price * amount;

      return await prisma.stockModel.create({
        data: {
          stockTicker,
          amount,
          price,
          totalValue,
          userId,
        },
      });
    }
  } catch (error) {
    console.error("Error creating or updating stock input:", error);
    throw error;
  }
};

export const getAllStockInput = async (userId, searchInput) => {
  if (!userId) {
    throw new Error("User ID is required to fetch the stock data.");
  }

  if (!searchInput) {
    // Fetch all stocks for the user
    const userStocks = await prisma.stockModel.findMany({
      where: {
        userId,
      },
      orderBy: {
        stockTicker: "asc",
      },
    });
    return userStocks;
  }

  // Fetch stocks matching the search input
  const userStocks = await prisma.stockModel.findMany({
    where: {
      userId,
      stockTicker: {
        contains: searchInput,
        mode: "insensitive", // Case-insensitive search
      },
    },
    orderBy: {
      stockTicker: "asc",
    },
  });
  return userStocks;
};
