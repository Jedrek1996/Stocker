"use client";
import React, { useState } from "react";
import { questions } from "@/data/queries";
import StockInfo from "./StockInfo";
import {
  getExistingStockQuery,
  generateStockResponse,
  getNewStockQuery,
} from "../../utils/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const NewStock = () => {
  const [selectedStock, setSelectedStock] = useState("Enter stock");
  const [selectedCountry, setSelectedCountry] = useState("Enter country");
  const [selectedQuery, setSelectedQuery] = useState("");

  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: stockData,
  } = useMutation({
    mutationFn: async (formInputs) => {
      try {
        const newStockResponse = await generateStockResponse(formInputs);
        console.log(newStockResponse);
        if (newStockResponse) {
          return newStockResponse;
        }
        toast.error(
          "No matching stock or country found. Please check your inputs again!"
        );
      } catch (error) {
        toast.error("An error occurred while fetching stock data.");
      }
    },
  });

  const queriesData = Object.keys(questions).map((category) => ({
    category,
    questions: questions[category].map((question) =>
      question
        .replace("stock input", selectedStock)
        .replace("country input", selectedCountry)
    ),
  }));

  const handleSelectedQuery = (query) => {
    console.log(query);
    setSelectedQuery(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formInputs = Object.fromEntries(formData.entries());
    formInputs.selectedQuery = selectedQuery;

    console.log(formInputs);

    if (!selectedQuery) {
      toast.error("Please select a query!");
      return;
    }
    mutate(formInputs);
  };
  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="mb-4 text-center text-5xl">Common Queries</h3>
        <ul className="mb-4 menu bg-base-200 rounded-box min-w-max">
          {queriesData.map(({ category, questions }) => (
            <li key={category}>
              <h3 className="menu-title">{category}</h3>
              <ul>
                {questions.map((question, index) => (
                  <li key={index}>
                    <a onClick={() => handleSelectedQuery(question)}>
                      {question}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mb-7 text-secondary">
          Selected Query: {selectedQuery}
        </div>
        <div className="join w-1/2">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="stock"
            name="stock"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            required
          />
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="country"
            name="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          />
          <button className="btn btn-primary join-item" type="submit">
            Ask Away
          </button>
        </div>
       </form>
      <div className="mt-16">
        <div className="mt-16">{stockData ? <StockInfo stockData={stockData} /> : null}</div>
      </div>
    </>
  );
};

export default NewStock;
