import type { NextPage } from "next";
import Feed from "~/components/Feed";
import Head from "~/components/Head";
import PostBox from "~/components/PostBox";
import SubredditRow from "~/components/SubredditRow";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const { data: latestCommunities } = trpc.useQuery([
    "subreddit.getSubredditsWithLimit",
    { limit: 10 },
  ]);

  return (
    <>
      <Head description="Home page of the app" />

      <div className="my-7 mx-auto max-w-5xl">
        <PostBox />

        <div className="flex">
          <Feed />

          <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
            <p className="text-md mb-1 p-4 pb-3 font-bold">
              Latest Communities
            </p>

            <div>
              {latestCommunities?.map((subreddit, i) => (
                <SubredditRow
                  key={subreddit.id}
                  topic={subreddit.topic}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
