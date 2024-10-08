import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Chat from "@/components/chat/Chat";

const page = () => {
  const queryClient = new QueryClient();
  return (
    //hydration in this context is to "hydrate" or populate the frontend with data that was pre-fetched and prepared on the backend.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat />
    </HydrationBoundary>
  );
};

export default page;
