import { z } from "zod";
import { createRouter } from "./context";

export const voteRouter = createRouter()
  .query("getVotesByPostId", {
    input: z.object({
      postId: z.string().uuid(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.vote.findMany({
        where: {
          postId: input.postId,
        },
      });
    },
  })
  .mutation("upvote", {
    input: z.object({
      postId: z.string().uuid(),
      username: z.string(),
      upvote: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.vote.create({
        data: {
          upvote: input.upvote,
          username: input.username,
          postId: input.postId,
        },
      });
    },
  });
