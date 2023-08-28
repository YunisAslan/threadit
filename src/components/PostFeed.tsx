"use client";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/types";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Post from "./Post";
import { Loader } from "lucide-react";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

function PostFeed({ initialPosts, subredditName }: PostFeedProps) {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "");

      const { data } = await axios.get(query);

      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  // after
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  // when data?.pages ... null or undefined only then are we going to render the initialPosts.
  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <>
      <ul className="flex flex-col col-span-2 space-y-6">
        {posts.map((post, index) => {
          const votesAmount = post.votes.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1;
            if (vote.type === "DOWN") return acc - 1;

            return acc;
          }, 0);

          const currentVote = post.votes.find(
            (vote) => vote.userId === session?.user.id
          );

          if (posts.length >= 2 && posts.length - 2 === index) {
            return (
              <li key={post.id} ref={ref}>
                <Post
                  post={post}
                  subredditName={post.subreddit.name}
                  commentAmount={post.comments.length}
                  currentVote={currentVote}
                  votesAmount={votesAmount}
                />
              </li>
            );
          } else {
            return (
              <Post
                key={post.id}
                post={post}
                subredditName={post.subreddit.name}
                commentAmount={post.comments.length}
                currentVote={currentVote}
                votesAmount={votesAmount}
              />
            );
          }
        })}

        {posts.length >= 2 && isFetchingNextPage ? (
          <div className="flex justify-center py-5">
            <Loader className="w-7 h-7 animate-spin text-zinc-900 dark:text-zinc-50" />
          </div>
        ) : null}
      </ul>
    </>
  );
}

export default PostFeed;
