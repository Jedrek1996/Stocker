"use client";

import StockInfo from "@/components/stock/StockInfo";
import { getSingleStockQuery } from "@/utils/action";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const SingleStockQueryPage = ({ params }) => {
  const { userId } = useAuth();
  const [stockData, setStockData] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchStockData = async () => {
      const data = await getSingleStockQuery(params.id, userId);
      if (!data) {
        router.push("/dashboard");
      } else {
        setStockData(data);
      }
    };

    fetchStockData();
  }, [params.id, userId, router]);

  return (
    <div>
      <Link href="/stockeraiHistory" className="btn btn-secondary mb-12">
        Back to history
      </Link>
      {stockData ? <StockInfo stockData={stockData} /> : <p>Loading...</p>}
    </div>
  );
};

export default SingleStockQueryPage;
