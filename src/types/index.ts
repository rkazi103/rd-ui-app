import { Comment, Post, Subreddit, Vote } from "@prisma/client";

export interface ModifiedPost extends Post {
  subreddit: Subreddit;
  comments: Comment[];
  votes: Vote[];
}
