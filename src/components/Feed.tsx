/* eslint-disable react-hooks/exhaustive-deps */
import { NextComponentType, NextPageContext } from "next";
import { useCallback, useEffect, useState } from "react";
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
  const { data: filteredPosts } = trpc.useQuery([
    "post.getPostsByTopic",
    { topic },
  ]);

  useEffect(() => {
    (async () => {
      const newPosts = await getNewPosts();
      setPosts(newPosts.data);
      setIsRefreshNeeded(false);
    })();
  }, [getNewPosts, isRefreshNeeded, setIsRefreshNeeded]);

  return (
    <div className="mt-5 space-y-4">
      {topic
        ? filteredPosts?.map(post => <Post key={post.id} post={post} />)
        : posts?.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Feed;
