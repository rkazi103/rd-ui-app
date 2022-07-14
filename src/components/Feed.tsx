import { NextComponentType } from "next";
import { trpc } from "~/utils/trpc";
import Post from "./Post";

const Feed: NextComponentType = () => {
  const { data: posts } = trpc.useQuery(["post.getAllPosts"]);

  return (
    <div>
      {posts?.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
