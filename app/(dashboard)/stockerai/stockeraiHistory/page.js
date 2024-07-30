import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PastStockQueriesPage from "@/components/stock/stockQueries/PastStockQueriesPage";
import { getAllStockQuery } from "@/utils/action";
import { auth, currentUser } from "@clerk/nextjs/server";

const stockeraiHistoryPage = async () => {
  const { userId } = auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stockAIQuery", ""],
    queryFn: () => getAllStockQuery(userId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PastStockQueriesPage />
    </HydrationBoundary>
  );
};

export default stockeraiHistoryPage;
