import { NextComponentType } from "next";
import { useEffect, useState } from "react";
import { useRedditContext } from "~/contexts/RedditContext";
import { ModifiedPost } from "~/types";
import { trpc } from "~/utils/trpc";
import Post from "./Post";

const Feed: NextComponentType = () => {
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

  return (
    <div className="mt-5 space-y-4">
      {posts?.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
