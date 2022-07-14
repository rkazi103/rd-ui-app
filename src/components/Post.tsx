import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";
import { Post } from "@prisma/client";
import { NextComponentType, NextPageContext } from "next";
import Avatar from "./Avatar";

type PostProps = {
  post: Post;
};

const Post: NextComponentType<NextPageContext, any, PostProps> = ({ post }) => {
  return (
    <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600">
      {/* Votes */}
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon className="vote-button hover:text-blue-500" />
        <p className="text-xs font-bold text-black">0</p>
        <ArrowDownIcon className="vote-button hover:text-red-500" />
      </div>

      <div>
        {/* Header */}
        <div className="p-3 pb-1">
          <div>{/* <Avatar seed={subreddit?.topic} /> */}</div>
        </div>

        {/* Body */}

        {/* Image */}

        {/* Footer */}
      </div>
    </div>
  );
};

export default Post;
