import { UsernameSchema } from "@/lib/validators/username";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = UsernameSchema.parse(body);

    const existUsername = await db.user.findFirst({
      where: {
        username: name,
      },
    });

    if (existUsername) {
      return new Response("Username is taken", { status: 409 });
    }

    // update username
    await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        username: name,
      },
    });

    return new Response("OKAY-OKAY");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not update username, please try again later.", {
      status: 500,
    });
  }
}
