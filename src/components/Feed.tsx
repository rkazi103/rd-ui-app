import { NextComponentType, NextPageContext } from "next";
import { useEffect, useState } from "react";
import { useRedditContext } from "~/contexts/RedditContext";
import { ModifiedPost } from "~/types";
import { trpc } from "~/utils/trpc";
import Post from "./Post";

type FeedProps = {
  topic?: string;
};

const Feed: NextComponentType<NextPageContext, any, FeedProps> = ({
  topic,
}) => {
  const { data: oldPosts, refetch: getNewPosts } = trpc.useQuery([
    "post.getAllPosts",
  ]);
  const [posts, setPosts] = useState<ModifiedPost[] | undefined>(oldPosts);
  const { isRefreshNeeded, setIsRefreshNeeded } = useRedditContext();

  useEffect(() => {
    (async () => {
      const newPosts = await getNewPosts();
      setPosts(newPosts.data);
      setIsRefreshNeeded(false);
    })();
  }, [getNewPosts, isRefreshNeeded, setIsRefreshNeeded]);

  useEffect(() => {
    if (topic) {
      const filteredPosts = posts?.filter(
        post => post.subreddit.topic === topic
      );
      setPosts(filteredPosts);
    }
  }, [posts, topic]);

  return (
    <div className="mt-5 space-y-4">
      {posts?.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
