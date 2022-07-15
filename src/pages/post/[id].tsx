/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "~/components/Loading";
import Post from "~/components/Post";
import { ModifiedPost } from "~/types";
import { trpc } from "~/utils/trpc";

const PostPage: NextPage = () => {
  const router = useRouter();
  const postId = router.query.id;
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [refresh, setRefresh] = useState(false);

  const {
    data: ogPost,
    isLoading,
    refetch: getUpdatedPost,
  } = trpc.useQuery(["post.getPostById", { id: postId as string }]);
  const { mutateAsync: createComment } = trpc.useMutation(
    "comment.createComment",
    { onSuccess: () => setRefresh(true) }
  );
  const [post, setPost] = useState<ModifiedPost | undefined>(ogPost);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const notification = toast.loading("Posting comment...");

    try {
      await createComment({
        postId: postId as string,
        username: session?.user?.name as string,
        text: comment,
      });
      toast.success("Comment Successfully Posted!", {
        id: notification,
      });
    } catch (e) {
      toast.error("Something Went Wrong!", {
        id: notification,
      });
    } finally {
      setComment("");
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await getUpdatedPost();
      setPost(data);
      setRefresh(false);
    })();
  }, [refresh]);

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post as ModifiedPost} />

      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        {session && (
          <p className="text-sm">
            Comment as{" "}
            <span className="text-red-500">{session?.user?.name}</span>
          </p>
        )}

        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are your thoughts?" : "Please sign in to comment"
            }
          />

          <button
            type="submit"
            disabled={!session}
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return { props: {} };
};
