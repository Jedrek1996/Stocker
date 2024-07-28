"use server";
import OpenAI from "openai";

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

export const getExistingStockQuery = async ({ stock, country }) => {
  return null;
};

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

export const getNewStockQuery = async (tour) => {
  return null;
};
