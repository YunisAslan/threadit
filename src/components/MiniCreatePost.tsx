"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import { User } from "@prisma/client";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { BsImage, BsLink } from "react-icons/bs";

interface MiniCreatePostProps {
  session: Session | null;
}

function MiniCreatePost({ session }: MiniCreatePostProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <li className="overflow-hidden rounded-md bg-white shadow list-none">
        <div className="h-full px-6 py-4 justify-between items-center space-y-3 gap-3 sm:flex sm:space-y-0">
          <div className="flex">
            <div className="relative">
              <UserAvatar user={session?.user as User} />

              <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
            </div>
          </div>

          <Input
            readOnly
            onClick={() => router.push(pathname + "/submit")}
            placeholder="Create post"
          />

          <Button
            onClick={() => router.push(pathname + "/submit")}
            variant="ghost"
          >
            <BsImage className="text-zinc-600 w-4 h-4" />
          </Button>
          <Button
            onClick={() => router.push(pathname + "/submit")}
            variant="ghost"
          >
            {" "}
            <BsLink className="text-zinc-600 w-4 h-4" />{" "}
          </Button>
        </div>
      </li>
    </>
  );
}

export default MiniCreatePost;
