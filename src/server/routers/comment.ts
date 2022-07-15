import { z } from "zod";
import { createRouter } from "./context";

export const commentRouter = createRouter().mutation("createComment", {
  input: z.object({
    username: z.string(),
    text: z.string(),
    postId: z.string().uuid(),
  }),
  async resolve({ input, ctx }) {
    await ctx.prisma.comment.create({
      data: {
        username: input.username,
        text: input.text,
        postId: input.postId,
      },
    });
  },
});
