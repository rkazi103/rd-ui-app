/* eslint-disable react-hooks/exhaustive-deps */
import { NextComponentType, NextPageContext } from "next";
import { useEffect, useState } from "react";
import { useRefresh } from "~/contexts/RefreshContext";
import { ModifiedPost } from "~/types";
import { trpc } from "~/utils/trpc";
import Post from "./Post";
import Loading from "./Loading";

type FeedProps = {
  topic?: string;
};

const Feed: NextComponentType<NextPageContext, any, FeedProps> = ({
  topic,
}) => {
  const {
    data: oldPosts,
    refetch: getNewPosts,
    isLoading: isOldPostsLoading,
  } = trpc.useQuery(["post.getAllPosts"]);
  const [posts, setPosts] = useState<ModifiedPost[] | undefined>(oldPosts);
  const { isRefreshNeeded, setIsRefreshNeeded } = useRefresh();
  const {
    data: filteredPosts,
    refetch: getNewFilteredPosts,
    isLoading: isFilteredPostsLoading,
  } = trpc.useQuery(["post.getPostsByTopic", { topic }]);

  useEffect(() => {
    (async () => {
      if (topic) {
        const { data: newFilteredPosts } = await getNewFilteredPosts();
        setPosts(newFilteredPosts);
      } else {
        const { data: newPosts } = await getNewPosts();
        setPosts(newPosts);
      }

      setIsRefreshNeeded(false);
    })();
  }, [getNewPosts, isRefreshNeeded, setIsRefreshNeeded]);

  if (isOldPostsLoading || isFilteredPostsLoading) return <Loading />;

  return (
    <div className="mt-5 space-y-4">
      {topic
        ? filteredPosts?.map(post => <Post key={post.id} post={post} />)
        : posts?.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Feed;
