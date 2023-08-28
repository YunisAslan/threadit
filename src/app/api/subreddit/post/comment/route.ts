import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { postId, text, replyToId } = CommentValidator.parse(body);

    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      },
    });

    return new Response("OKAAY");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not create comment, please try again later.", {
      status: 500,
    });
  }
}
