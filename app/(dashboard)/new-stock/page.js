import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NewStock from "@/components/stock/new-stock";

const page = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewStock />
    </HydrationBoundary>
  );
};

export default page;
