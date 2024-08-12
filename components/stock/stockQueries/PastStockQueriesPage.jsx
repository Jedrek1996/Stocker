"use client";
import { getAllStockQuery } from "@/utils/action";
import StocksList from "./StocksList";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

const PastStockQueriesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { userId } = useAuth();
  const { data, isPending } = useQuery({
    queryKey: ["stockAIQuery", searchValue],
    queryFn: () => getAllStockQuery(userId, searchValue),
  });
  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Enter Stock or Country here..."
            className="input input-bordered join-item w-full"
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "please wait" : "reset"}
          </button>
        </div>
      </form>
      <div>
        {isPending ? (
          <span className=" loading"></span>
        ) : (
          <StocksList data={data} />
        )}
      </div>
    </>
  );
};

export default PastStockQueriesPage;
