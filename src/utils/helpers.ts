import { Post, Subreddit } from "@prisma/client";
import { Context } from "~/server/routers/context";

export const modifyPost = async (post: Post, ctx: Context) => {
  const subreddit = (await ctx.prisma.subreddit.findFirst({
    where: {
      id: post.subredditId,
    },
  })) as Subreddit;

  const comments = await ctx.prisma.comment.findMany({
    where: {
      postId: post.id,
    },
  });

  const votes = await ctx.prisma.vote.findMany({
    where: {
      postId: post.id,
    },
  });

  return {
    ...post,
    comments,
    votes,
    subreddit,
  };
};
