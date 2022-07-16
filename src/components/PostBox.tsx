import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { NextComponentType, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRefresh } from "~/contexts/RefreshContext";
import { trpc } from "~/utils/trpc";
import Avatar from "./Avatar";

type FormData = {
  title: string;
  body: string;
  imgUrl: string;
  subreddit: string;
};

type PostBoxProps = {
  subreddit?: string;
};

const PostBox: NextComponentType<NextPageContext, any, PostBoxProps> = ({
  subreddit,
}) => {
  const { data: session } = useSession();
  const [isImageBoxOpen, setIsImageBoxOpen] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    body: "",
    imgUrl: "",
    subreddit: subreddit || "",
  });
  const [noSubreddit, setNoSubreddit] = useState(false);
  const { setIsRefreshNeeded } = useRefresh();

  const { data: subredditObj, refetch: refetchSubredditData } = trpc.useQuery([
    "subreddit.getSubredditByTopic",
    { topic: form.subreddit },
  ]);
  const { mutateAsync: createSubreddit } = trpc.useMutation(
    "subreddit.createSubreddit"
  );
  const { mutateAsync: createPost } = trpc.useMutation("post.createPost", {
    onSuccess: () => {
      setIsRefreshNeeded(true);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const notification = toast.loading("Creating new post...");

    if (form.subreddit === "") {
      setNoSubreddit(true);
      return;
    }

    try {
      if (subreddit) {
        await createPost({
          username: session?.user?.name as string,
          title: form.title,
          subredditId: subredditObj?.id as string,
          image: form.imgUrl,
          body: form.body,
        });
      } else {
        const isSubredditDefined = !!subredditObj;

        if (!isSubredditDefined) {
          await createSubreddit({
            topic: form.subreddit,
          });

          const { data: newSubredditObj } = await refetchSubredditData();

          await createPost({
            username: session?.user?.name as string,
            title: form.title,
            subredditId: newSubredditObj?.id as string,
            image: form.imgUrl,
            body: form.body,
          });
        } else {
          await createPost({
            username: session?.user?.name as string,
            title: form.title,
            subredditId: subredditObj?.id as string,
            image: form.imgUrl,
            body: form.body,
          });
        }
      }

      toast.success("New Post Created!", {
        id: notification,
      });
    } catch (e) {
      toast.error("Something went wrong!", {
        id: notification,
      });
    } finally {
      setForm({ body: "", imgUrl: "", subreddit: "", title: "" });
    }
  };

  return (
    <form
      className="sticky top-20 z-50 rounded-md border border-gray-300 bg-white p-2"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : "Create a post by entering a title"
              : "Sign in to post!"
          }
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
        />

        <PhotographIcon
          className={`h-6 cursor-pointer text-gray-300 ${
            isImageBoxOpen && "text-blue-300"
          }`}
          onClick={() => setIsImageBoxOpen(!isImageBoxOpen)}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {form.title !== "" && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
              type="text"
              placeholder="Text (Optional)"
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
            />
          </div>

          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit:</p>
              <input
                value={form.subreddit}
                onChange={e => setForm({ ...form, subreddit: e.target.value })}
                type="text"
                placeholder="i.e. nextjs"
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              />
            </div>
          )}

          {isImageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                value={form.imgUrl}
                onChange={e => setForm({ ...form, imgUrl: e.target.value })}
                type="text"
                placeholder="Optional..."
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              />
            </div>
          )}

          {noSubreddit && (
            <div className="space-y-2 p-2 text-red-500">
              <p>- A Subreddit is required</p>
            </div>
          )}

          {form.title !== "" && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default PostBox;
