import { Comment, Post, Subreddit, Vote } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface ModifiedPost extends Post {
  subreddit: Subreddit;
  comments: Comment[];
  votes: Vote[];
}

export type RedditContextType = {
  isRefreshNeeded: boolean;
  setIsRefreshNeeded: Dispatch<SetStateAction<boolean>>;
};
