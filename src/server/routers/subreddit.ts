import { z } from "zod";
import { createRouter } from "./context";

export const subredditRouter = createRouter().query("getSubredditById", {
  input: z.object({
    topic: z.string(),
  }),
  async resolve({ input, ctx }) {
    const subreddit = ctx.prisma.subreddit.findFirst({
      where: {
        topic: input.topic,
      },
    });

    return subreddit;
  },
});
