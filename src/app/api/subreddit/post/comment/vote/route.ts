import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { CommentVoteValidator, PostVoteValidator } from "@/lib/validators/vote";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { commentId, voteType } = CommentVoteValidator.parse(body);

    const existingVote = await db.commentVote.findFirst({
      where: {
        userId: session.user.id,
        commentId,
      },
    });

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.commentVote.delete({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
        });

        return new Response("OK");
      } else {
        await db.commentVote.update({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
          data: {
            type: voteType,
          },
        });

        return new Response("OK");
      }
    }

    await db.commentVote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        commentId,
      },
    });

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response("Could not register your vote, please try again.", {
      status: 500,
    });
  }
}
