import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import StockQueriesSeachPage from "@/components/stock/StockQueriesSearch";

const page = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StockQueriesSeachPage />
    </HydrationBoundary>
  );
};

export default page;
