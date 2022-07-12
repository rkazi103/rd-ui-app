import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Avatar from "./Avatar";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

const PostBox: NextComponentType = () => {
  const { data: session } = useSession();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [isImageBoxOpen, setIsImageBoxOpen] = useState<boolean>(false);

  const onSubmit = handleSubmit(
    async ({ postBody, postImage, postTitle, subreddit }) => {}
  );

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register("postTitle", { required: true })}
          type="text"
          placeholder={
            session ? "Create a post by entering a title" : "Sign in to post!"
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

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              {...register("postBody")}
              type="text"
              placeholder="Text (Optional)"
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
            />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              {...register("subreddit", { required: true })}
              type="text"
              placeholder="i.e. nextjs"
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
            />
          </div>

          {isImageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                {...register("postImage")}
                type="text"
                placeholder="Optional..."
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- A Post Title is required</p>
              )}

              {errors.subreddit?.type === "required" && (
                <p>- A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
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
