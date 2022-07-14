import { z } from "zod";
import { createRouter } from "./context";

export const subredditRouter = createRouter()
  .query("getSubredditByTopic", {
    input: z.object({
      topic: z.string(),
    }),
    async resolve({ input, ctx }) {
      const subreddit = await ctx.prisma.subreddit.findFirst({
        where: {
          topic: input.topic,
        },
      });

      return subreddit;
    },
  })
  .mutation("createSubreddit", {
    input: z.object({
      topic: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.subreddit.create({
        data: {
          topic: input.topic,
        },
      });
    },
  });
