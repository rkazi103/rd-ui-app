import { z } from "zod";
import { createRouter } from "./context";

export const postRouter = createRouter().mutation("createPost", {
  input: z.object({
    username: z.string(),
    title: z.string(),
    subredditId: z.string().uuid(),
    image: z.string(),
    body: z.string(),
  }),
  async resolve({ input }) {
    try {
      await prisma?.post.create({
        data: {
          body: input.body,
          username: input.username,
          title: input.title,
          image: input.image,
          subredditId: input.subredditId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  },
});
