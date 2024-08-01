"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { questions } from "@/data/queries";
import StockInfo from "./StockInfo";
import {
  getExistingStockQuery,
  generateStockResponse,
  createNewStockQuery,
} from "../../utils/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const StockQueriesSeachPage = () => {
  const { userId } = useAuth();
  const [selectedStock, setSelectedStock] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [queriesData, setQueriesData] = useState([]);

  useEffect(() => {
    const newQueriesData = Object.keys(questions).map((category) => ({
      category,
      questions: questions[category].map((question) =>
        question
          .replace("stock input", selectedStock)
          .replace("country input", selectedCountry)
      ),
    }));
    setQueriesData(newQueriesData);
    setSelectedQuery("");
  }, [selectedStock, selectedCountry]);

  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: stockData,
  } = useMutation({
    mutationFn: async (formInputs) => {
      //Check if existing inputs are in db
      const existingStock = await getExistingStockQuery(formInputs, userId);
      if (existingStock) return stockData;

      try {
        const newStockResponse = await generateStockResponse(formInputs);
        console.log(newStockResponse);
        if (newStockResponse) {
          await createNewStockQuery(newStockResponse, userId); //Save into db if it is a new stock
          queryClient.invalidateQueries({ queryKey: ["stockAIQuery"] });
          //Everytime the user uploads a new tour it will refetch
          //Marked as stale (outdated, will refetch again to ensure up2date)
          // InvalidateQueries makes the query stale right away, but the actual refetch happens the next time the query is used.
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

  const handleSelectedQuery = (query) => {
    console.log(query);
    setSelectedQuery(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Click Submit");
    const formData = new FormData(e.currentTarget);
    const formInputs = Object.fromEntries(formData.entries());
    formInputs.selectedQuery = selectedQuery;
    formInputs.userId = userId;

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
        <h1 className="mb-4 text-center text-5xl">StockAI Common Queries</h1>
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
        <div className="pl-4">
          <div className="mb-7 text-secondary">
            Selected Query: {selectedQuery}
          </div>
          <div className="join w-1/2">
            <input
              type="text"
              className="input input-bordered join-item w-full"
              placeholder="Eg. APPL, TSLA... "
              name="stock"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              required
            />
            <input
              type="text"
              className="input input-bordered join-item w-full"
              placeholder="Eg. China, Singapore..."
              name="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              required
            />
            <button className="btn btn-primary join-item" type="submit">
              Ask Away
            </button>
          </div>
        </div>
      </form>
      <div className="mt-16">
        <div className="mt-16">
          {stockData ? <StockInfo stockData={stockData} /> : null}
        </div>
      </div>
    </>
  );
};

export default StockQueriesSeachPage;
