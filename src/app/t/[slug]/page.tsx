import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MiniCreatePost from "@/components/MiniCreatePost";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

async function page({ params }: PageProps) {
  const { slug } = params;

  const session = await getServerSession(authOptions);

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },

        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        t/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      {/* TODO: Show posts in user feed*/}
    </>
  );
}

export default page;
