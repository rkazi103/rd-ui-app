import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "~/components/Loading";
import Post from "~/components/Post";
import { ModifiedPost } from "~/types";
import { trpc } from "~/utils/trpc";

const PostPage: NextPage = () => {
  const router = useRouter();
  const postId = router.query.id;
  const { data: post, isLoading } = trpc.useQuery([
    "post.getPostById",
    { id: postId as string },
  ]);

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post as ModifiedPost} />
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return { props: {} };
};
