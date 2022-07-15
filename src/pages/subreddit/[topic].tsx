import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Avatar from "~/components/Avatar";
import Feed from "~/components/Feed";
import PostBox from "~/components/PostBox";
import { prisma } from "~/server/db/client";

type SubredditPageProps = {
  isSubredditDefined: boolean;
};

const SubredditPage: NextPage<SubredditPageProps> = ({
  isSubredditDefined,
}) => {
  const router = useRouter();
  const topic = router.query.topic as string;

  if (!isSubredditDefined) router.push("/404");

  return (
    <div className="h-24 bg-red-400 p-8">
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic as string} large />
          </div>

          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-xs text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-5xl pb-10">
        <PostBox subreddit={topic} />
        <Feed topic={topic} />
      </div>
    </div>
  );
};

export default SubredditPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const topic = context?.params?.topic as string;
  const subreddit = await prisma.subreddit.findFirst({
    where: {
      topic: topic,
    },
  });
  const isSubredditDefined = !!subreddit;

  return { props: { isSubredditDefined } };
};
