"use client";

import StockInfo from "@/components/stock/StockInfo";
import { getSingleStockQuery } from "@/utils/action";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
const SingleStockQueryPage = async ({ params }) => {
  const { userId } = useAuth();
  const stockData = await getSingleStockQuery(params.id, userId);
  if (!stockData) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Link href="/stockeraiHistory" className="btn btn-secondary mb-12">
        Back to history
      </Link>
      <StockInfo stockData={stockData} />
    </div>
  );
};
export default SingleStockQueryPage;
