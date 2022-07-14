import { z } from "zod";
import { modifyPost, sortPosts } from "~/utils/helpers";
import { createRouter } from "./context";

export const postRouter = createRouter()
  .query("getAllPosts", {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany();

      const newPosts = sortPosts(
        await Promise.all(posts.map(async post => modifyPost(post, ctx)))
      );

      return newPosts;
    },
  })
  .mutation("createPost", {
    input: z.object({
      username: z.string(),
      title: z.string(),
      subredditId: z.string().uuid(),
      image: z.string(),
      body: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        await ctx.prisma.post.create({
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
