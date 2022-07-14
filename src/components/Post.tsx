/* eslint-disable @next/next/no-img-element */
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { NextComponentType, NextPageContext } from "next";
import { ModifiedPost } from "~/types";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";

type PostProps = {
  post: ModifiedPost;
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

      <div className="p-3 pb-1">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post.subreddit.topic} />

          <p className="text-xs text-gray-400">
            <span className="font-bold text-black hover:text-blue-500 hover:underline">
              r/{post.subreddit.topic}
            </span>{" "}
            ⋅ Posted by u/
            {post.username} <TimeAgo date={post.createdAt} />
          </p>
        </div>

        {/* Body */}
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm font-light">{post.body}</p>
        </div>

        {/* Image */}
        {post.image && (
          <img src={post.image} alt="Image of the post" className="w-full" />
        )}

        {/* Footer */}

        <div className="flex space-x-4 text-gray-400">
          <div className="post-button">
            <ChatAltIcon className="h-6 w-6" />
            <p className="">{post.comments.length}</p>
          </div>

          <div className="post-button">
            <GiftIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Award</p>
          </div>

          <div className="post-button">
            <ShareIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Share</p>
          </div>

          <div className="post-button">
            <BookmarkIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Save</p>
          </div>

          <div className="post-button">
            <DotsHorizontalIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
