import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//Public Route
const isPublicRoute = createRouteMatcher(["/"]);

//Requires Auth if not Public
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
