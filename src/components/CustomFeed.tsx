import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import PostFeed from "./PostFeed";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function CustomFeed() {
  const session = await getServerSession(authOptions);

  const followedCommunites = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunites.map(({ subreddit }) => subreddit.id),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  // @ts-ignore
  return <PostFeed initialPosts={posts} />;
}

export default CustomFeed;
