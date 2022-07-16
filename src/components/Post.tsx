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
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { trpc } from "~/utils/trpc";
import { Vote } from "@prisma/client";

type PostProps = {
  post: ModifiedPost;
};

// TODO: add delete vote functionality

const Post: NextComponentType<NextPageContext, any, PostProps> = ({ post }) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>();
  const [refresh, setRefresh] = useState<boolean>(false);

  const { data: votes, refetch: getUpdatedVotes } = trpc.useQuery([
    "vote.getVotesByPostId",
    { postId: post.id },
  ]);
  const [votesArr, setVotesArr] = useState<Vote[] | undefined>(votes);
  const { mutateAsync: createVote } = trpc.useMutation("vote.upvote", {
    onSuccess: () => setRefresh(true),
  });

  const upvote = async (isUpvote?: boolean) => {
    if (!session) toast("Please sign in to vote!");

    console.log("isUpvote", isUpvote);
    console.log("vote", vote);

    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    console.log("voting");

    await createVote({
      postId: post.id,
      upvote: isUpvote as boolean,
      username: session?.user?.name as string,
    });
  };

  useEffect(() => {
    const vote = votesArr?.find(
      vote => vote.username == session?.user?.name
    )?.upvote;
    setVote(vote);
  }, [session?.user?.name, votesArr]);

  useEffect(() => {
    (async () => {
      const { data: newVotes } = await getUpdatedVotes();
      setVotesArr(newVotes);
      setRefresh(false);
    })();
  }, [refresh, getUpdatedVotes]);

  const displayVotes = () => {
    const displayNum = votesArr?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votesArr?.length === 0) return 0;
    if (displayNum === 0) {
      const firstVote = votesArr?.[0];
      return firstVote?.upvote ? 1 : -1;
    }

    return displayNum;
  };

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            className={`vote-button hover:text-blue-500 ${
              vote && "text-blue-500"
            }`}
            onClick={() => upvote(true)}
          />

          <p className="text-xs font-bold text-black">{displayVotes()}</p>

          <ArrowDownIcon
            className={`vote-button hover:text-red-500 ${
              vote === false && "text-red-500"
            }`}
            onClick={() => upvote(false)}
          />
        </div>

        <div className="p-3 pb-1">
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit.topic} />

            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit.topic}`}>
                <span className="font-bold text-black hover:text-blue-500 hover:underline">
                  r/{post.subreddit.topic}
                </span>
              </Link>
              ⋅ Posted by u/
              {post.username} <TimeAgo date={post.createdAt} />
            </p>
          </div>

          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          {post.image && (
            <img src={post.image} alt="Image of the post" className="w-full" />
          )}

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
    </Link>
  );
};

export default Post;
