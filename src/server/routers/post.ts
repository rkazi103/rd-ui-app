import { Post } from "@prisma/client";
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
  .query("getPostsByTopic", {
    input: z.object({
      topic: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      if (!input.topic) return undefined;

      const subreddit = await ctx.prisma.subreddit.findFirst({
        where: {
          topic: input.topic,
        },
      });

      const posts = await ctx.prisma.post.findMany({
        where: {
          subredditId: subreddit?.id as string,
        },
      });

      return await Promise.all(posts.map(async post => modifyPost(post, ctx)));
    },
  })
  .query("getPostById", {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ input, ctx }) {
      const post = await ctx.prisma.post.findFirst({
        where: {
          id: input.id,
        },
      });

      return modifyPost(post as Post, ctx);
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
