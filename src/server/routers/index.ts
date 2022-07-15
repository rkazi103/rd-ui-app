import superjson from "superjson";
import { commentRouter } from "./comment";
import { createRouter } from "./context";
import { postRouter } from "./post";
import { subredditRouter } from "./subreddit";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postRouter)
  .merge("subreddit.", subredditRouter)
  .merge("comment.", commentRouter);

export type AppRouter = typeof appRouter;
