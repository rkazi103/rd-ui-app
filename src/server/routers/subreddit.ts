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
  .query("getSubredditsWithLimit", {
    input: z.object({
      limit: z.number().min(1).max(10),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.subreddit.findMany({
        take: input.limit,
        orderBy: {
          createdAt: "desc",
        },
      });
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
