import superjson from "superjson";
import { commentRouter } from "./comment";
import { createRouter } from "./context";
import { postRouter } from "./post";
import { subredditRouter } from "./subreddit";
import { voteRouter } from "./vote";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postRouter)
  .merge("subreddit.", subredditRouter)
  .merge("comment.", commentRouter)
  .merge("vote.", voteRouter);

export type AppRouter = typeof appRouter;
