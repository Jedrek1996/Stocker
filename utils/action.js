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
        userId, // Ensure the query checks the specific user's data
      },
    },
  });
};

// export const createNewStockQuery = async (stock) => {
//   return prisma.stockAIModel.create({
//     data: stock,
//   });
// };
export const createNewStockQuery = async (stock, userId) => {
  return prisma.stockAIModel.create({
    data: {
      ...stock,
      userId, // Add the userId to the data object
    },
  });
};

// export const getAllStockQuery = async (searchInput) => {
//   // If no search input by default
//   if (!searchInput) {
//     const aiQueries = await prisma.stockAIModel.findMany({
//       orderBy: {
//         stock: "asc",
//       },
//     });
//     return aiQueries;
//   }

//   const aiQueries = await prisma.stockAIModel.findMany({
//     where: {
//       OR: [
//         {
//           stock: {
//             contains: searchInput,
//           },
//         },
//         {
//           country: {
//             contains: searchInput,
//           },
//         },
//       ],
//     },
//     orderBy: {
//       stock: "asc",
//     },
//   });
//   return aiQueries;
// };

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

// export const getSingleStockQuery = async (id) => {
//   return prisma.stockAIModel.findUnique({
//     where: {
//       id,
//     },
//   });
// };
